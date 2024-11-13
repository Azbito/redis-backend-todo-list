// server.ts
import Fastify from "fastify";
import fastifyJWT from "@fastify/jwt";
import dotenv from "dotenv";
import authPlugin from "./plugins/auth-plugin";
import redisPlugin from "./plugins/redis-plugin";
import { UserRepository } from "./repositories/user-repositories";
import { AuthService } from "./services/auth-services";
import { AuthController } from "./controller/auth-controller";
import { envConfig } from "./configs/env-config";
import { UserController } from "./controller/user-controller";

dotenv.config();

const fastify = Fastify({ logger: true });

fastify.register(redisPlugin);
fastify.register(fastifyJWT, {
  secret: envConfig.JWT_TOKEN,
});

fastify.register(authPlugin);

const userRepository = new UserRepository(fastify);
const authService = new AuthService(userRepository, fastify);
const authController = new AuthController(authService);
const userController = new UserController(userRepository);

fastify.post("/register", (request, reply) =>
  authController.register(request, reply)
);
fastify.post("/login", (request, reply) =>
  authController.login(request, reply)
);

fastify.get("/users/:id", (request, reply) =>
  userController.getUserById(request, reply)
);

const start = async () => {
  try {
    await fastify.listen({ port: Number(envConfig.PORT) });
    fastify.log.info(`Servidor rodando em ${envConfig.HOST}:${envConfig.PORT}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
