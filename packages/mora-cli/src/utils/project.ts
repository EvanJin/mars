import { readFileSync } from "node:fs";
import path from "node:path";
import fs from "node:fs/promises";
import { PackageJson } from "type-fest";
import fg from "fast-glob";
import { ProjectInfo } from "../types/project";

class Project {
  private readonly PROJECT_SHARED_IGNORE = [
    "**/node_modules/**",
    "public",
    "dist",
    "build",
    ".turbo",
  ];

  async getProjectInfo(cwd: string): Promise<ProjectInfo> {
    const isTsxProject = await this.isTypescriptProject(cwd);
    const packageJson = await this.getPackageJson(cwd);

    return {
      isTsxProject,
      packageJson,
    };
  }

  async isTypescriptProject(cwd: string) {
    const files = await fg.glob("tsconfig.*", {
      cwd,
      deep: 1,
      ignore: this.PROJECT_SHARED_IGNORE,
    });

    return files.length > 0;
  }

  async getPackageJson(
    cwd: string,
    shouldThrow: boolean = true,
  ): Promise<PackageJson | null> {
    try {
      return JSON.parse(readFileSync(path.join(cwd, "package.json"), "utf-8"));
    } catch (error) {
      if (shouldThrow) {
        throw error;
      }
      return null;
    }
  }

  async getTailwindCssFile(cwd: string) {
    const files = await fg.glob(["**/*.css", "**/*.scss"], {
      cwd,
      deep: 5,
      ignore: this.PROJECT_SHARED_IGNORE,
    });

    if (!files.length) {
      return null;
    }

    for (const file of files) {
      const contents = await fs.readFile(path.resolve(cwd, file), "utf8");
      if (contents.includes("@tailwind base")) {
        return file;
      }
    }

    return null;
  }

  async getTailwindConfigFile(cwd: string) {
    const files = await fg.glob("tailwind.config.*", {
      cwd,
      deep: 3,
      ignore: this.PROJECT_SHARED_IGNORE,
    });

    if (!files.length) {
      return null;
    }

    return files[0];
  }
}

export default new Project();
