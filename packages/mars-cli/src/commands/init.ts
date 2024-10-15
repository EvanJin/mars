import { Command } from "commander";
import logger from "@/src/utils/logger";
import { handleError } from "@/src/utils/errors";
import { MarsInitSchema } from "@/src/types/common";

export const init = new Command()
  .name("init")
  .description("init a new mars project")
  .argument("<modules>", "the modules to init")
  .option("-f, --force", "force init", false)
  .option("-c, --cwd [path]", "project path", process.cwd())
  .action(async (modules, options) => {
    try {
      const opts = MarsInitSchema.parse({
        modules,
        cwd: options.cwd,
        force: options.force,
        ...options,
      });

      logger.info(JSON.stringify(opts));
      if (!opts.force) {
        logger.info("force init");
      }
    } catch (error) {
      logger.break();
      handleError(error);
    }
  });
