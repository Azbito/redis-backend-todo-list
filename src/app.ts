import fastify from "fastify";
import fastifyJwt from "@fastify/jwt";
import { envConfig } from "@/configs/env-config";
import { appRoutes } from "@/routes";
import { ZodError } from "zod";
import redis from "@fastify/redis";

export const app = fastify();

app.register(redis, {
  url: envConfig.REDIS_URL,
});

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
