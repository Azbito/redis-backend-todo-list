import env from "env-var";
import "dotenv/config";

import { NodeEnvsEnum, StagesEnum } from "@/constants";
import type { EnvConfig } from "@/interfaces/env-config";

const { get } = env;

export const envConfig: EnvConfig = {
  NODE_ENV: get("NODE_ENV").required().asEnum(Object.values(NodeEnvsEnum)),
  STAGE: get("STAGE").required().asEnum(Object.values(StagesEnum)),
  JWT_TOKEN: get("JWT_TOKEN").required().asString(),
  PORT: get("PORT").required().asInt(),
  HOST: get("HOST").required().asString(),
  REDIS_URL: get("REDIS_URL").required().asString(),
};
