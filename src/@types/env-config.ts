import type { NodeEnvsEnum, StagesEnum } from "@/constants/env-constants";

export type EnvConfig = {
  NODE_ENV: NodeEnvsEnum;
  STAGE: StagesEnum;
  JWT_TOKEN: string;
  PORT: number;
  API_KEY: string;
  HOST: string;
  IP: string;
};
