import { z } from "zod";

export const WebFramework = z.object({
  root: z.string().default("./web"),
  src: z.string().default("src"),
  entry: z.string().default("main.tsx"),
  framework: z.string().default("react"),
  language: z.string().default("typescript"),
  "state-management": z
    .enum(["mobx", "redux", "zustand", "jotai", "valtio"])
    .default("mobx"),
  "ui-library": z
    .enum(["mora-ui", "tailwind-css", "antd", "mantine", "mui"])
    .default("mora-ui"),
  bundler: z
    .enum(["vite", "webpack", "rollup", "esbuild", "umi"])
    .default("vite"),
  linter: z.string().default("eslint"),
  prettier: z.string().default("prettier"),
  test: z.string().default("jest"),
  ui: z
    .object({
      components: z.string().default("components/ui"),
      blocks: z.string().default("components/blocks"),
      layouts: z.string().default("layouts"),
      pages: z.string().default("pages"),
      constants: z.string().default("constants"),
      hooks: z.string().default("hooks"),
      utils: z.string().default("utils"),
      types: z.string().default("types"),
    })
    .optional()
    .default({}),
});

export type IWebFramework = z.infer<typeof WebFramework>;

export const ServiceFramework = z.object({
  root: z.string().default("./service"),
  src: z.string().default("src"),
  entry: z.string().default("main.ts"),
  framework: z.string().default("nestjs"),
  language: z.string().default("typescript"),
  bundler: z.string().default("tsup"),
  linter: z.string().default("eslint"),
  prettier: z.string().default("prettier"),
  test: z.string().default("jest"),
});

export type IServiceFramework = z.infer<typeof ServiceFramework>;

export const MoraFramework = z.object({
  $schema: z.string().default("https://mora.shopee.io/schema/more.schema.json"),
  web: WebFramework.optional().default({}),
  service: ServiceFramework.optional().default({}),
});

export type IMoraFramework = z.infer<typeof MoraFramework>;
