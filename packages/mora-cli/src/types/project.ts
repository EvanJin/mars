import { PackageJson } from "type-fest";

export type ProjectInfo = {
  isTsxProject: boolean;
  packageJson: PackageJson | null;
};
