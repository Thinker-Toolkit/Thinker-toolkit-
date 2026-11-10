export interface SkillDefinition {
  id: string;
  name: string;
  description: string;
  category: "debugging" | "testing" | "architecture" | "workflow";
  rulesContent: string;
}

export const CORE_SKILLS: SkillDefinition[] = [
  {
    id: "systematic-debugging",
    name: "Systematic Debugging",
    description: "Rigorous 4-step root cause analysis before modifying any code",
    category: "debugging",
    rulesContent: `### Rule: Systematic Debugging Protocol
1. Never apply random fixes or speculate. Formulate a specific hypothesis first.
2. Isolate the exact reproduction steps and inspect actual stack traces/logs.
3. Verify the root cause before touching implementation files.
4. Add regression test assertions to guarantee the bug never returns.`,
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
4. Run the test suite to confirm passing status, then refactor cleanly.`,
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
4. Verify application build succeeds with zero errors.`,
  },
  {
    id: "parallel-worktrees",
    name: "Parallel Worktree Orchestration",
    description: "Subagent isolation across independent Git worktrees",
    category: "workflow",
    rulesContent: `### Rule: Subagent Worktree Isolation
1. Independent features or refactors must execute in isolated Git worktrees.
2. Prevent state collision and file locking between parallel agents.
3. Merge back via explicit verification barriers and code review checks.`,
  },
];

export function listSkills(): SkillDefinition[] {
  return CORE_SKILLS;
}

export function getSkill(id: string): SkillDefinition | undefined {
  return CORE_SKILLS.find((s) => s.id === id);
}
