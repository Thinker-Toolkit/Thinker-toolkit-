import fs from "node:fs";
import path from "node:path";
import { type SupportedIDE } from "./detector";
import { CORE_SKILLS, type SkillDefinition } from "./registry";
import { renderCursorRules } from "../templates/cursor";
import { renderClaudeRules } from "../templates/claude";
import { renderWindsurfRules } from "../templates/windsurf";
import { renderVSCodeSettings } from "../templates/vscode";
import { renderAntigravityRules } from "../templates/antigravity";

export interface InstallOptions {
  cwd?: string;
  skills?: SkillDefinition[];
  overwrite?: boolean;
}

export interface InstallResult {
  target: SupportedIDE;
  filePath: string;
  action: "created" | "overwritten" | "backed_up_and_created" | "skipped";
}

export function installTarget(
  target: SupportedIDE,
  options: InstallOptions = {}
): InstallResult {
  const cwd = path.resolve(options.cwd || process.cwd());
  const skills = options.skills || CORE_SKILLS;

  let relativePath = "";
  let content = "";

  switch (target) {
    case "cursor":
      relativePath = ".cursorrules";
      content = renderCursorRules(skills);
      break;
    case "claude":
      relativePath = "CLAUDE.md";
      content = renderClaudeRules(skills);
      break;
    case "windsurf":
      relativePath = ".windsurfrules";
      content = renderWindsurfRules(skills);
      break;
    case "vscode":
      relativePath = path.join(".vscode", "settings.json");
      content = renderVSCodeSettings(skills);
      break;
    case "antigravity":
      relativePath = path.join(".gemini", "rules", "thinker.md");
      content = renderAntigravityRules(skills);
      break;
    default:
      throw new Error(`Unsupported IDE target: ${target}`);
  }

  const fullPath = path.join(cwd, relativePath);
  const dir = path.dirname(fullPath);

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  let action: InstallResult["action"] = "created";

  if (fs.existsSync(fullPath)) {
    if (options.overwrite) {
      action = "overwritten";
    } else {
      // Safe backup
      const backupPath = `${fullPath}.bak`;
      fs.copyFileSync(fullPath, backupPath);
      action = "backed_up_and_created";
    }
  }

  fs.writeFileSync(fullPath, content, "utf-8");

  return {
    target,
    filePath: fullPath,
    action,
  };
}
