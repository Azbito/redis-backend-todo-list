import { get } from "env-var";
import "dotenv/config";

import type { EnvConfig } from "@/@types/env-config";
import { NodeEnvsEnum, StagesEnum } from "@/constants/env-constants";

export const envConfig: EnvConfig = {
  NODE_ENV: get("NODE_ENV").required().asEnum(Object.values(NodeEnvsEnum)),
  STAGE: get("STAGE").required().asEnum(Object.values(StagesEnum)),
  JWT_TOKEN: get("JWT_TOKEN").required().asString(),
  PORT: get("PORT").required().asInt(),
  API_KEY: get("API_KEY").required().asString(),
  HOST: get("HOST").required().asString(),
  IP: get("IP").required().asString(),
};
