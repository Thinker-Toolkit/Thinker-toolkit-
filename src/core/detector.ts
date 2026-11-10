import fs from "node:fs";
import path from "node:path";

export type SupportedIDE = "cursor" | "claude" | "vscode" | "windsurf" | "antigravity";
export type SupportedFramework = "next" | "vite" | "node" | "python" | "unknown";
export type PackageManager = "npm" | "pnpm" | "yarn" | "bun";

export interface WorkspaceContext {
  cwd: string;
  framework: SupportedFramework;
  packageManager: PackageManager;
  detectedIDEs: SupportedIDE[];
  hasGit: boolean;
}

export function detectWorkspace(targetDir: string = process.cwd()): WorkspaceContext {
  const cwd = path.resolve(targetDir);

  // 1. Check Git
  const hasGit = fs.existsSync(path.join(cwd, ".git")) || fs.existsSync(path.join(cwd, "../.git"));

  // 2. Check Package Manager
  let packageManager: PackageManager = "npm";
  if (fs.existsSync(path.join(cwd, "pnpm-lock.yaml"))) {
    packageManager = "pnpm";
  } else if (fs.existsSync(path.join(cwd, "yarn.lock"))) {
    packageManager = "yarn";
  } else if (fs.existsSync(path.join(cwd, "bun.lockb")) || fs.existsSync(path.join(cwd, "bun.lock"))) {
    packageManager = "bun";
  }

  // 3. Check Framework
  let framework: SupportedFramework = "unknown";
  const pkgPath = path.join(cwd, "package.json");
  if (fs.existsSync(pkgPath)) {
    try {
      const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf-8"));
      const allDeps = {
        ...pkg.dependencies,
        ...pkg.devDependencies,
      };
      if (allDeps["next"]) {
        framework = "next";
      } else if (allDeps["vite"]) {
        framework = "vite";
      } else {
        framework = "node";
      }
    } catch {
      framework = "node";
    }
  } else if (fs.existsSync(path.join(cwd, "requirements.txt")) || fs.existsSync(path.join(cwd, "pyproject.toml"))) {
    framework = "python";
  }

  // 4. Check Installed / Active IDE configurations
  const detectedIDEs: SupportedIDE[] = [];
  if (fs.existsSync(path.join(cwd, ".cursor")) || fs.existsSync(path.join(cwd, ".cursorrules"))) {
    detectedIDEs.push("cursor");
  }
  if (fs.existsSync(path.join(cwd, ".claude")) || fs.existsSync(path.join(cwd, "CLAUDE.md"))) {
    detectedIDEs.push("claude");
  }
  if (fs.existsSync(path.join(cwd, ".vscode"))) {
    detectedIDEs.push("vscode");
  }
  if (fs.existsSync(path.join(cwd, ".windsurfrules")) || fs.existsSync(path.join(cwd, ".windsurf"))) {
    detectedIDEs.push("windsurf");
  }
  if (
    fs.existsSync(path.join(cwd, ".gemini")) ||
    fs.existsSync(path.join(process.env.HOME || "", ".gemini/antigravity"))
  ) {
    detectedIDEs.push("antigravity");
  }

  return {
    cwd,
    framework,
    packageManager,
    detectedIDEs,
    hasGit,
  };
}
