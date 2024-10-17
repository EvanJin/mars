import { ProjectInfo } from "./project";

export type IPreflightInitRes = {
  errors: Record<string, boolean>;
  project: ProjectInfo | null;
};
