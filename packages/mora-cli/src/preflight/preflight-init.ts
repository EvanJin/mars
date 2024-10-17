import path from "node:path";
import { ERRORS, IMarsInitSchema } from "../types/common";
import Spinner from "@/src/utils/spinner";
import { existsSync } from "node:fs";
import logger from "@/src/utils/logger";
import Project from "@/src/utils/project";
import { IPreflightInitRes } from "@/src/types/errors";
import Logger from "@/src/utils/logger";
import { WebFramework } from "../types/schema";

export default class PreflightInit {
  static errors: Record<string, boolean> = {};

  static async run(opts: IMarsInitSchema): Promise<IPreflightInitRes> {
    const spinner = Spinner.create({
      text: "Preflight project...",
      silent: opts.silent,
    }).start();

    if (
      !existsSync(opts.cwd!) ||
      !existsSync(path.join(opts.cwd!, "package.json"))
    ) {
      spinner?.fail();
      this.errors[ERRORS.MISSING_DIR_OR_PACKAGE_JSON_OR_EMPTY_PROJECT] = true;
      return {
        errors: this.errors,
        project: null,
      };
    }

    if (existsSync(path.join(opts.cwd!, "mars.framework.json"))) {
      if (!opts.force) {
        spinner?.fail("Mora framework configuration file already exists");
        logger.break();
        process.exit(1);
      }
    }

    spinner?.succeed();

    const frameworkSpinner = Spinner.create({
      text: "Verifying Mars framework...",
      silent: opts.silent,
    }).start();

    const projectInfo = await Project.getProjectInfo(opts.cwd!);

    frameworkSpinner.succeed();

    Logger.info(
      "Project info:",
      JSON.stringify(WebFramework.parse({}), null, 2),
    );

    return {
      errors: this.errors,
      project: projectInfo,
    };
  }
}
