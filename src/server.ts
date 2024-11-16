import dotenv from "dotenv";
import { envConfig } from "./configs/env-config";
import { app } from "./app";

dotenv.config();

const start = async () => {
  try {
    await app.listen({ port: Number(envConfig.PORT) });
    app.log.info(`Servidor rodando em ${envConfig.HOST}:${envConfig.PORT}`);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();
