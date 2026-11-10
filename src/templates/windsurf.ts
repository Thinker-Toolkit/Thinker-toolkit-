import type { SkillDefinition } from "../core/registry";

export function renderWindsurfRules(skills: SkillDefinition[]): string {
  const rules = skills.map((s) => s.rulesContent).join("\n\n");
  return `# .windsurfrules - Thinker Toolkit
# Generated automatically by thinker-toolkit

${rules}
`;
}
