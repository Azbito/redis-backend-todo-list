import type { FastifyJwtVerifyOptions } from "@fastify/jwt";
import "fastify";
import { RedisClientType } from "redis";

declare module "fastify" {
  interface FastifyInstance {
    redis: RedisClientType;
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
