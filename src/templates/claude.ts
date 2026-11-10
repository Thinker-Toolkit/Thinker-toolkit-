import type { SkillDefinition } from "../core/registry";

export function renderClaudeRules(skills: SkillDefinition[]): string {
  const rules = skills.map((s) => s.rulesContent).join("\n\n");
  return `# CLAUDE.md - Thinker Toolkit Directives
# Generated automatically by thinker-toolkit

You are an expert engineer adhering to Thinker Toolkit engineering principles.

## Core Protocols
${rules}
`;
}
