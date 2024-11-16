import type { NodeEnvsEnum, StagesEnum } from "@/constants";

export type EnvConfig = {
  NODE_ENV: NodeEnvsEnum;
  STAGE: StagesEnum;
  JWT_TOKEN: string;
  PORT: number;
  HOST: string;
  REDIS_URL: string;
};
