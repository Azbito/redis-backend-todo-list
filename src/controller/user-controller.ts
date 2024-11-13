import type { UserRepository } from "@/repositories/user-repositories";
import { FastifyRequest, FastifyReply } from "fastify";

export class UserController {
  private userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async getUserById(request: FastifyRequest, reply: FastifyReply) {
    const { id } = request.params as { id: string };

    try {
      const user = await this.userRepository.findById(id);
      if (!user) {
        reply.status(404).send({ message: "Usuário não encontrado" });
      } else {
        reply.send(user);
      }
    } catch (err: any) {
      reply
        .status(500)
        .send({ message: "Erro ao buscar usuário", error: err.message });
    }
  }
}
