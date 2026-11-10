import type { SkillDefinition } from "../core/registry";

export function renderCursorRules(skills: SkillDefinition[]): string {
  const rules = skills.map((s) => s.rulesContent).join("\n\n");
  return `# Thinker Toolkit Protocol (Cursor)
# Generated automatically by thinker-toolkit

You are an expert AI software engineer operating under Thinker Toolkit protocols.
Always adhere strictly to the engineering rules below without shortcuts or guesswork.

${rules}
`;
}
