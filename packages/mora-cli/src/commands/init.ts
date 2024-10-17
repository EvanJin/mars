import { Command } from "commander";
import logger from "@/src/utils/logger";
import { handleError } from "@/src/utils/errors";
import { ERRORS, IMarsInitSchema, MarsInitSchema } from "@/src/types/common";
import PreflightInit from "@/src/preflight/preflight-init";

export const init = new Command()
  .name("init")
  .description("init a new mars project")
  .argument("[modules]", "the modules to init")
  .option("-f, --force", "force init", false)
  .option("-c, --cwd [path]", "project path", process.cwd())
  .option("-s, --silent", "mute output", false)
  .action(async (modules, options) => {
    try {
      const opts = MarsInitSchema.parse({
        modules,
        cwd: options.cwd,
        force: options.force,
        ...options,
      });

      logger.info("Initializing project...");

      await run(opts);
    } catch (error) {
      logger.break();
      handleError(error);
    }
  });

/**
 * Runs the initialization process for a Mars project.
 *
 * @param opts - The initialization options conforming to IMarsInitSchema.
 * @returns A Promise that resolves when the initialization is complete.
 * @throws Will exit the process if critical preflight checks fail.
 */
async function run(opts: IMarsInitSchema) {
  const preflights = await PreflightInit.run(opts);

  if (preflights.errors) {
    if (
      preflights.errors[ERRORS.MISSING_DIR_OR_PACKAGE_JSON_OR_EMPTY_PROJECT]
    ) {
      logger.error(
        "Preflights failed: Missing directory, package.json, or empty project"
      );
      process.exit(1);
    }
  }

  logger.info("Preflights:", preflights);
}
