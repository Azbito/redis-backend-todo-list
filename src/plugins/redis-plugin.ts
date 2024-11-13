import fp from "fastify-plugin";
import Redis from "ioredis";
import { FastifyInstance } from "fastify";

const redisPlugin = fp(async (fastify: FastifyInstance) => {
  const redis = new Redis();
  fastify.decorate("redis", redis);

  fastify.addHook("onClose", async (fastifyInstance) => {
    fastifyInstance.redis.disconnect();
  });
});

export default redisPlugin;
