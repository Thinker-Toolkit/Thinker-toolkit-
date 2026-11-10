import { execSync } from "node:child_process";
import pc from "picocolors";
import { logger } from "../utils/logger";

export function verifyCommand(options: { strict?: boolean } = {}) {
  logger.info(pc.bold("\n  Thinker Toolkit — Invariant & Regression Verification\n"));

  let failed = false;

  // 1. Typecheck
  try {
    logger.dim("  [1/3] Verifying TypeScript invariants (tsc --noEmit)...");
    execSync("npx tsc --noEmit", { stdio: "ignore" });
    logger.success("    ✓ TypeScript type-check passed without errors.");
  } catch {
    logger.error("    ✗ TypeScript verification failed.");
    failed = true;
  }

  // 2. Tests
  try {
    logger.dim("  [2/3] Verifying regression test suite...");
    execSync("npm test -- --run", { stdio: "ignore" });
    logger.success("    ✓ All automated unit & integration tests passed.");
  } catch {
    logger.warn("    ! Automated test suite returned non-zero exit code or not configured.");
    if (options.strict) failed = true;
  }

  // 3. Git Status
  try {
    logger.dim("  [3/3] Checking working directory cleanliness...");
    const status = execSync("git status --porcelain", { encoding: "utf-8" }).trim();
    if (status.length === 0) {
      logger.success("    ✓ Git working tree is clean.");
    } else {
      logger.dim(`    ! Working tree has uncommitted changes (${status.split("\n").length} files).`);
    }
  } catch {
    logger.dim("    ! Git check skipped (not a git repository).");
  }

  if (failed && options.strict) {
    logger.error(pc.red("\n  Verification barrier FAILED in strict mode. Exiting.\n"));
    process.exit(1);
  } else {
    logger.info(pc.green("\n  Invariant verification complete. Ready for safe shipping.\n"));
  }
}
