import { cyan, green, red, yellow } from "kleur/colors";

export default class Logger {
  static highligh = {
    info: cyan,
    error: red,
    warn: yellow,
    success: green,
    log: cyan,
  };

  static info(...args: unknown[]) {
    console.log("[mars-cli]", this.highligh.info(args.join(" ")));
  }

  static error(...args: unknown[]) {
    console.log("[mars-cli]", this.highligh.error(args.join(" ")));
  }

  static warn(...args: unknown[]) {
    console.log("[mars-cli]", this.highligh.warn(args.join(" ")));
  }

  static success(...args: unknown[]) {
    console.log("[mars-cli]", this.highligh.success(args.join(" ")));
  }

  static log(...args: unknown[]) {
    console.log("[mars-cli]", this.highligh.log(args.join(" ")));
  }

  static break() {
    console.log("");
  }
}
