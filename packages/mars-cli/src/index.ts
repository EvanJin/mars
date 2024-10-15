#!/usr/bin/env node
// import { add } from "@/src/commands/add";
// import { diff } from "@/src/commands/diff";
import { init } from "@/src/commands/init";
import { Command } from "commander";

import packageJson from "../package.json";
import logger from "./utils/logger";

process.on("SIGINT", () => process.exit(0));
process.on("SIGTERM", () => process.exit(0));

function main() {
  const program = new Command()
    .name("mars-cli")
    .description("add components and dependencies to your project")
    .version(
      packageJson.version || "1.0.0",
      "-v, --version",
      "display the version number"
    )
    .action((options) => {
      logger.info(options);
    });

  program.addCommand(init); //.addCommand(add).addCommand(diff);

  program.parse(process.argv);
}

main();
