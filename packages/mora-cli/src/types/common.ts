import { z } from "zod";
import { Options } from "ora";

export const MarsInitSchema = z.object({
  modules: z.enum(["block", "component", "page"]).default("component"),
  cwd: z.string().optional(),
  force: z.boolean().optional(),
  silent: z.boolean().optional(),
});

export type IMarsInitSchema = z.infer<typeof MarsInitSchema>;

// Spinner Option
export type ISpinnerOption = {
  text: Options["text"];
  silent?: boolean;
};

export enum ERRORS {
  MISSING_DIR_OR_PACKAGE_JSON_OR_EMPTY_PROJECT = 1,
}
