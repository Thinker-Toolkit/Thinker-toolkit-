import { describe, it, expect } from "vitest";
import { detectWorkspace } from "../src/core/detector";
import path from "node:path";

describe("Workspace Detector", () => {
  it("should detect framework and git in a Next.js directory", () => {
    // Current landing directory is a Next.js project
    const landingPath = path.resolve(__dirname, "../../thinker-landing");
    const context = detectWorkspace(landingPath);
    expect(context.framework).toBe("next");
    expect(context.hasGit).toBe(true);
    expect(context.packageManager).toBe("npm");
  });

  it("should detect IDE signatures when configuration folders exist", () => {
    const context = detectWorkspace(process.cwd());
    expect(Array.isArray(context.detectedIDEs)).toBe(true);
  });
});
