import { describe, it, expect, beforeEach, afterEach } from "vitest";
import fs from "node:fs";
import path from "node:path";
import os from "node:os";
import { installTarget } from "../src/core/installer";

describe("Installer", () => {
  let tempDir: string;

  beforeEach(() => {
    tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "thinker-test-"));
  });

  afterEach(() => {
    fs.rmSync(tempDir, { recursive: true, force: true });
  });

  it("should create .cursorrules when target is cursor", () => {
    const res = installTarget("cursor", { cwd: tempDir });
    expect(res.action).toBe("created");
    expect(fs.existsSync(path.join(tempDir, ".cursorrules"))).toBe(true);
    const content = fs.readFileSync(path.join(tempDir, ".cursorrules"), "utf-8");
    expect(content).toContain("Thinker Toolkit Protocol");
  });

  it("should backup existing file before creating new one when overwrite is false", () => {
    const targetFile = path.join(tempDir, "CLAUDE.md");
    fs.writeFileSync(targetFile, "ORIGINAL CONTENT");

    const res = installTarget("claude", { cwd: tempDir, overwrite: false });
    expect(res.action).toBe("backed_up_and_created");
    expect(fs.existsSync(`${targetFile}.bak`)).toBe(true);
    expect(fs.readFileSync(`${targetFile}.bak`, "utf-8")).toBe("ORIGINAL CONTENT");
  });
});
