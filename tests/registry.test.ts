import { describe, it, expect } from "vitest";
import { getSkill, listSkills, CORE_SKILLS } from "../src/core/registry";

describe("Skills Registry", () => {
  it("should list all core skills", () => {
    const skills = listSkills();
    expect(skills.length).toBeGreaterThanOrEqual(4);
    const ids = skills.map((s) => s.id);
    expect(ids).toContain("systematic-debugging");
    expect(ids).toContain("test-driven-development");
    expect(ids).toContain("verification-before-completion");
    expect(ids).toContain("parallel-worktrees");
  });

  it("should retrieve a skill by id", () => {
    const skill = getSkill("systematic-debugging");
    expect(skill).toBeDefined();
    expect(skill?.name).toBe("Systematic Debugging");
    expect(skill?.rulesContent).toContain("Never apply random fixes");
  });
});
