import pc from "picocolors";
import { listSkills } from "../core/registry";
import { logger } from "../utils/logger";

export function listCommand() {
  logger.info(pc.bold("\n  Thinker Toolkit — Curated Skills & Invariant Protocols\n"));

  const skills = listSkills();
  for (const s of skills) {
    logger.info(`  ${pc.cyan(s.id.padEnd(30))} [${s.category}]`);
    logger.dim(`    ${s.description}`);
  }
  logger.info("\n");
}
