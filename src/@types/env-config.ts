import type { NodeEnvsEnum, StagesEnum } from "@/constants/env-constants";

export type EnvConfig = {
  NODE_ENV: NodeEnvsEnum;
  STAGE: StagesEnum;
  JWT_TOKEN: string;
};
