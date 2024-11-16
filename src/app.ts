import fastify from "fastify";
import fastifyJwt from "@fastify/jwt";
import { envConfig } from "@/configs/env-config";
import { appRoutes } from "@/routes";
import { ZodError } from "zod";
import Redis from "ioredis";

export const app = fastify();

const redisClient = new Redis(envConfig.REDIS_URL);

app.decorate("redis", redisClient);

app.register(fastifyJwt, { secret: envConfig.JWT_TOKEN });
app.register(appRoutes);

app.setErrorHandler((error, _request, reply) => {
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: "Validation error", issues: error.format() });
  }

  console.error("Unhandled error:", error);
  return reply.status(500).send({ message: "Internal server error" });
});
