import Fastify, { FastifyInstance, FastifyRequest } from "fastify";
import fastifyJWT from "fastify-jwt";
import fastifyRedis from "fastify-redis";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import "dotenv/config";

dotenv.config();

const fastify: FastifyInstance = Fastify({ logger: true });

fastify.register(fastifyJWT, {
  secret: process.env.JWT_SECRET || "supersecret",
});

fastify.register(fastifyRedis, {
  host: "127.0.0.1",
  port: 6379,
});

interface User {
  username: string;
  password: string;
}

interface LoginRequest extends FastifyRequest {
  body: { username: string; password: string };
}
