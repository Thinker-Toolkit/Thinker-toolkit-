import type { SkillDefinition } from "../core/registry";

export function renderVSCodeSettings(skills: SkillDefinition[]): string {
  return JSON.stringify(
    {
      "thinker.enabled": true,
      "thinker.protocols": skills.map((s) => s.id),
      "editor.formatOnSave": true,
      "typescript.tsdk": "node_modules/typescript/lib",
    },
    null,
    2
  );
}
