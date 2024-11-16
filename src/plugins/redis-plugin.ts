import fp from "fastify-plugin";
import { FastifyInstance } from "fastify";
import fastifyRedis from "@fastify/redis";
import { envConfig } from "@/configs/env-config";

const redisPlugin = fp(async (fastify: FastifyInstance) => {
  fastify.register(fastifyRedis, {
    host: envConfig.IP,
    port: 6379,
  });

  fastify.addHook("onClose", async (fastifyInstance) => {
    await fastifyInstance.redis.quit();
  });
});

export default redisPlugin;
