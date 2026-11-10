import pc from "picocolors";
import { type SupportedIDE } from "../core/detector";
import { installTarget } from "../core/installer";
import { logger } from "../utils/logger";

export async function integrateCommand(
  target: string,
  options: { yes?: boolean; overwrite?: boolean } = {}
) {
  const validTargets: SupportedIDE[] = ["cursor", "claude", "vscode", "windsurf", "antigravity"];
  const lower = target.toLowerCase() as SupportedIDE;

  if (!validTargets.includes(lower)) {
    logger.error(`\n  Invalid target '${target}'. Available: ${validTargets.join(", ")}\n`);
    process.exit(1);
  }

  try {
    const res = installTarget(lower, { overwrite: options.overwrite });
    logger.success(`\n  ✓ Thinker protocol integrated for ${pc.cyan(lower)}`);
    logger.dim(`    File: ${res.filePath}`);
    logger.dim(`    Status: ${res.action}\n`);
  } catch (err: any) {
    logger.error(`\n  ✗ Integration failed: ${err.message}\n`);
    process.exit(1);
  }
}
