import dotenv from "dotenv";
import { envConfig } from "./configs/env-config";
import { app } from "./app";

dotenv.config();

const start = async () => {
  const port = Number(envConfig.PORT) || 3000;

  try {
    await app.listen({ port });
    app.log.info(`Server running on port ${port}`);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();
