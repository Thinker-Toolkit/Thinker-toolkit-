import type { SkillDefinition } from "../core/registry";

export function renderAntigravityRules(skills: SkillDefinition[]): string {
  const rules = skills.map((s) => s.rulesContent).join("\n\n");
  return `# Thinker Toolkit Global Rules for Google Antigravity
# Generated automatically by thinker-toolkit

${rules}
`;
}
