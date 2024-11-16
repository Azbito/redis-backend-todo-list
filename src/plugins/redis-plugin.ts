import { FastifyInstance } from "fastify";
import fastifyRedis from "@fastify/redis";
import { envConfig } from "@/configs/env-config";

async function registerRedisPlugin(fastify: FastifyInstance) {
  try {
    await fastify.register(fastifyRedis, {
      url: envConfig.REDIS_URL,
      tls: {
        rejectUnauthorized: false,
      },
    });
  } catch (err) {
    console.error("Erro ao registrar o plugin Redis:", err);
    return;
  }

  if (!fastify.redis) {
    console.error("A instância do Redis não foi registrada corretamente.");
    return;
  }

  try {
    fastify.redis.on("ready", () => {
      console.log("Conexão com Redis estabelecida com sucesso!");
    });

    fastify.redis.on("error", (err) => {
      console.error("Erro ao conectar ao Redis:", err);
    });

    fastify.redis.on("end", () => {
      console.log("Conexão com Redis foi encerrada.");
    });

    fastify.redis.on("reconnecting", () => {
      console.log("Tentando reconectar ao Redis...");
    });

    fastify.redis.on("connect", () => {
      console.log("Conectado ao Redis (socket aberto).");
    });
  } catch (e: any) {
    console.error("Erro ao registrar eventos Redis:", e);
  }

  fastify.addHook("onClose", async (fastifyInstance) => {
    console.log("Fechando conexão com Redis...");
    try {
      await fastifyInstance.redis.quit();
      console.log("Conexão com Redis fechada com sucesso.");
    } catch (err) {
      console.error("Erro ao fechar conexão com Redis:", err);
    }
  });
}

const redisPlugin = async (fastify: FastifyInstance) => {
  await registerRedisPlugin(fastify);
};

export default redisPlugin;
