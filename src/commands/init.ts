import prompts from "prompts";
import pc from "picocolors";
import { detectWorkspace, type SupportedIDE } from "../core/detector";
import { installTarget } from "../core/installer";
import { logger } from "../utils/logger";

export async function initCommand(options: { yes?: boolean } = {}) {
  logger.info(pc.bold("\n  Thinker Toolkit — IDE Integration Setup\n"));

  const workspace = detectWorkspace();
  logger.dim(`  Detected framework: ${workspace.framework}`);
  logger.dim(`  Package manager:    ${workspace.packageManager}`);
  logger.dim(`  Git repository:     ${workspace.hasGit ? "yes" : "no"}\n`);

  let selectedIDEs: SupportedIDE[] = workspace.detectedIDEs;

  if (!options.yes && selectedIDEs.length === 0) {
    const response = await prompts({
      type: "multiselect",
      name: "ides",
      message: "Select IDE targets to configure with Thinker skills:",
      choices: [
        { title: "Cursor (.cursorrules)", value: "cursor", selected: true },
        { title: "Claude Code (CLAUDE.md)", value: "claude", selected: true },
        { title: "VS Code (.vscode/settings.json)", value: "vscode" },
        { title: "Windsurf (.windsurfrules)", value: "windsurf" },
        { title: "Google Antigravity (.gemini/rules)", value: "antigravity" },
      ],
      hint: "- Space to select. Enter to submit",
    });

    selectedIDEs = response.ides || [];
  } else if (selectedIDEs.length === 0) {
    // Default fallback in --yes mode
    selectedIDEs = ["cursor", "claude"];
  }

  if (selectedIDEs.length === 0) {
    logger.warn("  No IDE targets selected. Exiting.");
    return;
  }

  for (const ide of selectedIDEs) {
    try {
      const res = installTarget(ide, { cwd: workspace.cwd });
      if (res.action === "backed_up_and_created") {
        logger.info(`  ✓ Configured ${pc.cyan(ide)} (backed up existing to .bak)`);
      } else {
        logger.success(`  ✓ Configured ${pc.cyan(ide)} -> ${res.filePath}`);
      }
    } catch (err: any) {
      logger.error(`  ✗ Failed to configure ${ide}: ${err.message}`);
    }
  }

  logger.info(pc.green("\n  Thinker skills successfully injected. Ready for deliberate engineering.\n"));
}
