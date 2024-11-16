import type { FastifyJwtVerifyOptions } from "@fastify/jwt";
import "fastify";
import type Redis from "ioredis";
import { RedisClientType } from "redis";

declare module "fastify" {
  interface FastifyInstance {
    redis: Redis;
    jwt: {
      sign(payload: object): string;
      verify<T>(token: string): T;
    };
    jwtVerify(): Promise<any>;
  }

  interface FastifyRequest {
    user?: {
      id: string;
    };
  }
}
