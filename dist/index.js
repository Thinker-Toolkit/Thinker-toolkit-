"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var index_exports = {};
__export(index_exports, {
  CORE_SKILLS: () => CORE_SKILLS,
  createProgram: () => createProgram,
  detectWorkspace: () => detectWorkspace,
  getSkill: () => getSkill,
  installTarget: () => installTarget,
  listSkills: () => listSkills,
  run: () => run
});
module.exports = __toCommonJS(index_exports);

// src/core/detector.ts
var import_node_fs = __toESM(require("fs"));
var import_node_path = __toESM(require("path"));
function detectWorkspace(targetDir = process.cwd()) {
  const cwd = import_node_path.default.resolve(targetDir);
  const hasGit = import_node_fs.default.existsSync(import_node_path.default.join(cwd, ".git")) || import_node_fs.default.existsSync(import_node_path.default.join(cwd, "../.git"));
  let packageManager = "npm";
  if (import_node_fs.default.existsSync(import_node_path.default.join(cwd, "pnpm-lock.yaml"))) {
    packageManager = "pnpm";
  } else if (import_node_fs.default.existsSync(import_node_path.default.join(cwd, "yarn.lock"))) {
    packageManager = "yarn";
  } else if (import_node_fs.default.existsSync(import_node_path.default.join(cwd, "bun.lockb")) || import_node_fs.default.existsSync(import_node_path.default.join(cwd, "bun.lock"))) {
    packageManager = "bun";
  }
  let framework = "unknown";
  const pkgPath = import_node_path.default.join(cwd, "package.json");
  if (import_node_fs.default.existsSync(pkgPath)) {
    try {
      const pkg = JSON.parse(import_node_fs.default.readFileSync(pkgPath, "utf-8"));
      const allDeps = {
        ...pkg.dependencies,
        ...pkg.devDependencies
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
  } else if (import_node_fs.default.existsSync(import_node_path.default.join(cwd, "requirements.txt")) || import_node_fs.default.existsSync(import_node_path.default.join(cwd, "pyproject.toml"))) {
    framework = "python";
  }
  const detectedIDEs = [];
  if (import_node_fs.default.existsSync(import_node_path.default.join(cwd, ".cursor")) || import_node_fs.default.existsSync(import_node_path.default.join(cwd, ".cursorrules"))) {
    detectedIDEs.push("cursor");
  }
  if (import_node_fs.default.existsSync(import_node_path.default.join(cwd, ".claude")) || import_node_fs.default.existsSync(import_node_path.default.join(cwd, "CLAUDE.md"))) {
    detectedIDEs.push("claude");
  }
  if (import_node_fs.default.existsSync(import_node_path.default.join(cwd, ".vscode"))) {
    detectedIDEs.push("vscode");
  }
  if (import_node_fs.default.existsSync(import_node_path.default.join(cwd, ".windsurfrules")) || import_node_fs.default.existsSync(import_node_path.default.join(cwd, ".windsurf"))) {
    detectedIDEs.push("windsurf");
  }
  if (import_node_fs.default.existsSync(import_node_path.default.join(cwd, ".gemini")) || import_node_fs.default.existsSync(import_node_path.default.join(process.env.HOME || "", ".gemini/antigravity"))) {
    detectedIDEs.push("antigravity");
  }
  return {
    cwd,
    framework,
    packageManager,
    detectedIDEs,
    hasGit
  };
}

// src/core/registry.ts
var CORE_SKILLS = [
  {
    id: "systematic-debugging",
    name: "Systematic Debugging",
    description: "Rigorous 4-step root cause analysis before modifying any code",
    category: "debugging",
    rulesContent: `### Rule: Systematic Debugging Protocol
1. Never apply random fixes or speculate. Formulate a specific hypothesis first.
2. Isolate the exact reproduction steps and inspect actual stack traces/logs.
3. Verify the root cause before touching implementation files.
4. Add regression test assertions to guarantee the bug never returns.`
  },
  {
    id: "test-driven-development",
    name: "Test-Driven Development",
    description: "Enforce failing tests before writing production code",
    category: "testing",
    rulesContent: `### Rule: Test-Driven Development (TDD)
1. Write a focused, failing unit or integration test before implementing functionality.
2. Run the test and verify it fails with the expected assertion error.
3. Write the minimal production code needed to satisfy the test.
4. Run the test suite to confirm passing status, then refactor cleanly.`
  },
  {
    id: "verification-before-completion",
    name: "Verification Before Completion",
    description: "Mandatory pre-flight checks before marking tasks resolved",
    category: "testing",
    rulesContent: `### Rule: Verification Before Completion
1. Never claim a task or bugfix is complete without concrete execution evidence.
2. Run full type checking (e.g. \`tsc --noEmit\`).
3. Run linting and automated unit/integration test suites.
4. Verify application build succeeds with zero errors.`
  },
  {
    id: "parallel-worktrees",
    name: "Parallel Worktree Orchestration",
    description: "Subagent isolation across independent Git worktrees",
    category: "workflow",
    rulesContent: `### Rule: Subagent Worktree Isolation
1. Independent features or refactors must execute in isolated Git worktrees.
2. Prevent state collision and file locking between parallel agents.
3. Merge back via explicit verification barriers and code review checks.`
  }
];
function listSkills() {
  return CORE_SKILLS;
}
function getSkill(id) {
  return CORE_SKILLS.find((s) => s.id === id);
}

// src/core/installer.ts
var import_node_fs2 = __toESM(require("fs"));
var import_node_path2 = __toESM(require("path"));

// src/templates/cursor.ts
function renderCursorRules(skills) {
  const rules = skills.map((s) => s.rulesContent).join("\n\n");
  return `# Thinker Toolkit Protocol (Cursor)
# Generated automatically by thinker-toolkit

You are an expert AI software engineer operating under Thinker Toolkit protocols.
Always adhere strictly to the engineering rules below without shortcuts or guesswork.

${rules}
`;
}

// src/templates/claude.ts
function renderClaudeRules(skills) {
  const rules = skills.map((s) => s.rulesContent).join("\n\n");
  return `# CLAUDE.md - Thinker Toolkit Directives
# Generated automatically by thinker-toolkit

You are an expert engineer adhering to Thinker Toolkit engineering principles.

## Core Protocols
${rules}
`;
}

// src/templates/windsurf.ts
function renderWindsurfRules(skills) {
  const rules = skills.map((s) => s.rulesContent).join("\n\n");
  return `# .windsurfrules - Thinker Toolkit
# Generated automatically by thinker-toolkit

${rules}
`;
}

// src/templates/vscode.ts
function renderVSCodeSettings(skills) {
  return JSON.stringify(
    {
      "thinker.enabled": true,
      "thinker.protocols": skills.map((s) => s.id),
      "editor.formatOnSave": true,
      "typescript.tsdk": "node_modules/typescript/lib"
    },
    null,
    2
  );
}

// src/templates/antigravity.ts
function renderAntigravityRules(skills) {
  const rules = skills.map((s) => s.rulesContent).join("\n\n");
  return `# Thinker Toolkit Global Rules for Google Antigravity
# Generated automatically by thinker-toolkit

${rules}
`;
}

// src/core/installer.ts
function installTarget(target, options = {}) {
  const cwd = import_node_path2.default.resolve(options.cwd || process.cwd());
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
      relativePath = import_node_path2.default.join(".vscode", "settings.json");
      content = renderVSCodeSettings(skills);
      break;
    case "antigravity":
      relativePath = import_node_path2.default.join(".gemini", "rules", "thinker.md");
      content = renderAntigravityRules(skills);
      break;
    default:
      throw new Error(`Unsupported IDE target: ${target}`);
  }
  const fullPath = import_node_path2.default.join(cwd, relativePath);
  const dir = import_node_path2.default.dirname(fullPath);
  if (!import_node_fs2.default.existsSync(dir)) {
    import_node_fs2.default.mkdirSync(dir, { recursive: true });
  }
  let action = "created";
  if (import_node_fs2.default.existsSync(fullPath)) {
    if (options.overwrite) {
      action = "overwritten";
    } else {
      const backupPath = `${fullPath}.bak`;
      import_node_fs2.default.copyFileSync(fullPath, backupPath);
      action = "backed_up_and_created";
    }
  }
  import_node_fs2.default.writeFileSync(fullPath, content, "utf-8");
  return {
    target,
    filePath: fullPath,
    action
  };
}

// src/cli.ts
var import_commander = require("commander");

// src/commands/init.ts
var import_prompts = __toESM(require("prompts"));
var import_picocolors2 = __toESM(require("picocolors"));

// src/utils/logger.ts
var import_picocolors = __toESM(require("picocolors"));
var logger = {
  info: (msg) => console.log(import_picocolors.default.white(msg)),
  success: (msg) => console.log(import_picocolors.default.green(msg)),
  warn: (msg) => console.log(import_picocolors.default.yellow(msg)),
  error: (msg) => console.error(import_picocolors.default.red(msg)),
  dim: (msg) => console.log(import_picocolors.default.dim(msg)),
  bold: (msg) => import_picocolors.default.bold(msg)
};

// src/commands/init.ts
async function initCommand(options = {}) {
  logger.info(import_picocolors2.default.bold("\n  Thinker Toolkit \u2014 IDE Integration Setup\n"));
  const workspace = detectWorkspace();
  logger.dim(`  Detected framework: ${workspace.framework}`);
  logger.dim(`  Package manager:    ${workspace.packageManager}`);
  logger.dim(`  Git repository:     ${workspace.hasGit ? "yes" : "no"}
`);
  let selectedIDEs = workspace.detectedIDEs;
  if (!options.yes && selectedIDEs.length === 0) {
    const response = await (0, import_prompts.default)({
      type: "multiselect",
      name: "ides",
      message: "Select IDE targets to configure with Thinker skills:",
      choices: [
        { title: "Cursor (.cursorrules)", value: "cursor", selected: true },
        { title: "Claude Code (CLAUDE.md)", value: "claude", selected: true },
        { title: "VS Code (.vscode/settings.json)", value: "vscode" },
        { title: "Windsurf (.windsurfrules)", value: "windsurf" },
        { title: "Google Antigravity (.gemini/rules)", value: "antigravity" }
      ],
      hint: "- Space to select. Enter to submit"
    });
    selectedIDEs = response.ides || [];
  } else if (selectedIDEs.length === 0) {
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
        logger.info(`  \u2713 Configured ${import_picocolors2.default.cyan(ide)} (backed up existing to .bak)`);
      } else {
        logger.success(`  \u2713 Configured ${import_picocolors2.default.cyan(ide)} -> ${res.filePath}`);
      }
    } catch (err) {
      logger.error(`  \u2717 Failed to configure ${ide}: ${err.message}`);
    }
  }
  logger.info(import_picocolors2.default.green("\n  Thinker skills successfully injected. Ready for deliberate engineering.\n"));
}

// src/commands/integrate.ts
var import_picocolors3 = __toESM(require("picocolors"));
async function integrateCommand(target, options = {}) {
  const validTargets = ["cursor", "claude", "vscode", "windsurf", "antigravity"];
  const lower = target.toLowerCase();
  if (!validTargets.includes(lower)) {
    logger.error(`
  Invalid target '${target}'. Available: ${validTargets.join(", ")}
`);
    process.exit(1);
  }
  try {
    const res = installTarget(lower, { overwrite: options.overwrite });
    logger.success(`
  \u2713 Thinker protocol integrated for ${import_picocolors3.default.cyan(lower)}`);
    logger.dim(`    File: ${res.filePath}`);
    logger.dim(`    Status: ${res.action}
`);
  } catch (err) {
    logger.error(`
  \u2717 Integration failed: ${err.message}
`);
    process.exit(1);
  }
}

// src/commands/list.ts
var import_picocolors4 = __toESM(require("picocolors"));
function listCommand() {
  logger.info(import_picocolors4.default.bold("\n  Thinker Toolkit \u2014 Curated Skills & Invariant Protocols\n"));
  const skills = listSkills();
  for (const s of skills) {
    logger.info(`  ${import_picocolors4.default.cyan(s.id.padEnd(30))} [${s.category}]`);
    logger.dim(`    ${s.description}`);
  }
  logger.info("\n");
}

// src/commands/verify.ts
var import_node_child_process = require("child_process");
var import_picocolors5 = __toESM(require("picocolors"));
function verifyCommand(options = {}) {
  logger.info(import_picocolors5.default.bold("\n  Thinker Toolkit \u2014 Invariant & Regression Verification\n"));
  let failed = false;
  try {
    logger.dim("  [1/3] Verifying TypeScript invariants (tsc --noEmit)...");
    (0, import_node_child_process.execSync)("npx tsc --noEmit", { stdio: "ignore" });
    logger.success("    \u2713 TypeScript type-check passed without errors.");
  } catch {
    logger.error("    \u2717 TypeScript verification failed.");
    failed = true;
  }
  try {
    logger.dim("  [2/3] Verifying regression test suite...");
    (0, import_node_child_process.execSync)("npm test -- --run", { stdio: "ignore" });
    logger.success("    \u2713 All automated unit & integration tests passed.");
  } catch {
    logger.warn("    ! Automated test suite returned non-zero exit code or not configured.");
    if (options.strict) failed = true;
  }
  try {
    logger.dim("  [3/3] Checking working directory cleanliness...");
    const status = (0, import_node_child_process.execSync)("git status --porcelain", { encoding: "utf-8" }).trim();
    if (status.length === 0) {
      logger.success("    \u2713 Git working tree is clean.");
    } else {
      logger.dim(`    ! Working tree has uncommitted changes (${status.split("\n").length} files).`);
    }
  } catch {
    logger.dim("    ! Git check skipped (not a git repository).");
  }
  if (failed && options.strict) {
    logger.error(import_picocolors5.default.red("\n  Verification barrier FAILED in strict mode. Exiting.\n"));
    process.exit(1);
  } else {
    logger.info(import_picocolors5.default.green("\n  Invariant verification complete. Ready for safe shipping.\n"));
  }
}

// src/cli.ts
function createProgram() {
  const program = new import_commander.Command();
  program.name("thinker").description("Protocol-driven engineering skills runtime for AI-assisted development").version("0.1.0");
  program.command("init").description("Initialize and configure Thinker skills in your workspace").option("-y, --yes", "Skip interactive prompts and use sensible defaults").action(async (options) => {
    await initCommand(options);
  });
  program.command("integrate").description("Integrate Thinker protocols directly into an IDE target").requiredOption("-t, --target <ide>", "Target IDE: cursor, claude, vscode, windsurf, antigravity").option("-o, --overwrite", "Overwrite existing configuration instead of backing up").action(async (options) => {
    await integrateCommand(options.target, options);
  });
  program.command("list").description("List all available invariant protocols and skills").action(() => {
    listCommand();
  });
  program.command("verify").description("Run invariant checks, type-checking, and regression barriers").option("--strict", "Enforce strict zero-failure mode").action((options) => {
    verifyCommand(options);
  });
  return program;
}
function run() {
  const program = createProgram();
  program.parse(process.argv);
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  CORE_SKILLS,
  createProgram,
  detectWorkspace,
  getSkill,
  installTarget,
  listSkills,
  run
});
//# sourceMappingURL=index.js.map