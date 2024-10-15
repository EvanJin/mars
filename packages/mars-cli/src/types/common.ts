import { z } from "zod";

export const MarsInitSchema = z.object({
  modules: z.enum(["block", "component", "page"]).optional(),
  cwd: z.string().optional(),
  force: z.boolean().optional(),
});

export type IMarsInitSchema = z.infer<typeof MarsInitSchema>;
