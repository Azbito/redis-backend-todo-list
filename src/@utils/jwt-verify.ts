import { FastifyReply, FastifyRequest } from "fastify";

export async function jwtVerify(
  request: FastifyRequest<{ Body: any }>,
  reply: FastifyReply
) {
  try {
    await request.jwtVerify();
  } catch (error) {
    return reply.status(401).send({ message: "❌ Unauthorized" });
  }
}
