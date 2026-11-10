export { createProgram, run } from './cli.js';
import 'commander';

type SupportedIDE = "cursor" | "claude" | "vscode" | "windsurf" | "antigravity";
type SupportedFramework = "next" | "vite" | "node" | "python" | "unknown";
type PackageManager = "npm" | "pnpm" | "yarn" | "bun";
interface WorkspaceContext {
    cwd: string;
    framework: SupportedFramework;
    packageManager: PackageManager;
    detectedIDEs: SupportedIDE[];
    hasGit: boolean;
}
declare function detectWorkspace(targetDir?: string): WorkspaceContext;

interface SkillDefinition {
    id: string;
    name: string;
    description: string;
    category: "debugging" | "testing" | "architecture" | "workflow";
    rulesContent: string;
}
declare const CORE_SKILLS: SkillDefinition[];
declare function listSkills(): SkillDefinition[];
declare function getSkill(id: string): SkillDefinition | undefined;

interface InstallOptions {
    cwd?: string;
    skills?: SkillDefinition[];
    overwrite?: boolean;
}
interface InstallResult {
    target: SupportedIDE;
    filePath: string;
    action: "created" | "overwritten" | "backed_up_and_created" | "skipped";
}
declare function installTarget(target: SupportedIDE, options?: InstallOptions): InstallResult;

export { CORE_SKILLS, type InstallOptions, type InstallResult, type PackageManager, type SkillDefinition, type SupportedFramework, type SupportedIDE, type WorkspaceContext, detectWorkspace, getSkill, installTarget, listSkills };
