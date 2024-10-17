import { cyan, green, red, yellow } from "kleur/colors";

export default class Logger {
  static highlight = {
    info: cyan,
    error: red,
    warn: yellow,
    success: green,
    log: cyan,
  };

  static info(...args: unknown[]) {
    console.log("[mora-cli]", this.highlight.info(args.join(" ")));
  }

  static error(...args: unknown[]) {
    console.log("[mora-cli]", this.highlight.error(args.join(" ")));
  }

  static warn(...args: unknown[]) {
    console.log("[mora-cli]", this.highlight.warn(args.join(" ")));
  }

  static success(...args: unknown[]) {
    console.log("[mora-cli]", this.highlight.success(args.join(" ")));
  }

  static log(...args: unknown[]) {
    console.log("[mora-cli]", this.highlight.log(args.join(" ")));
  }

  static break() {
    console.log("");
  }
}
