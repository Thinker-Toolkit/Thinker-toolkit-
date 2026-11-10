import { describe, it, expect } from "vitest";
import { createProgram } from "../src/cli";

describe("CLI Program", () => {
  it("should configure commander commands properly", () => {
    const program = createProgram();
    expect(program.name()).toBe("thinker");

    const commands = program.commands.map((c) => c.name());
    expect(commands).toContain("init");
    expect(commands).toContain("integrate");
    expect(commands).toContain("list");
    expect(commands).toContain("verify");
  });
});
