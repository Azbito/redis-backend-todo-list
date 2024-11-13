import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";

export default async function authPlugin(fastify: FastifyInstance) {
  fastify.decorate(
    "authenticate",
    async function (request: FastifyRequest, reply: FastifyReply) {
      try {
        await request.jwtVerify();
      } catch (err) {
        reply.send(err);
      }
    }
  );
}
