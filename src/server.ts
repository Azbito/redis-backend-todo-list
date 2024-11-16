import dotenv from "dotenv";
import { envConfig } from "@/configs/env-config";
import { app } from "./app";

dotenv.config();

const start = async () => {
  const port = Number(envConfig.PORT) || 3000;

  try {
    app.listen({ port: 3000, host: "0.0.0.0" }, (err, address) => {
      if (err) {
        process.exit(1);
      }
      console.log(`Server is running on ${address}`);
    });
    console.log(`Server running on port ${port}`);
    app.log.info(`Server running on port ${port}`);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();
