import { userSaveSchema, userSchema } from "@/schemas/user-schemas";
import type { AuthService } from "@/services/auth-services";
import { FastifyReply, FastifyRequest } from "fastify";
import { v4 as uuidv4 } from "uuid";

export class AuthController {
  constructor(private readonly authService: AuthService) {}

  async register(request: FastifyRequest, reply: FastifyReply) {
    const parseResult = userSaveSchema.safeParse(request.body);

    if (!parseResult.success) {
      return reply.status(400).send(parseResult.error.format());
    }

    const user = parseResult.data;

    user.uuid = uuidv4();

    try {
      await this.authService.register(user);
      reply.send({ message: "Usuário registrado com sucesso!" });
    } catch (error: any) {
      reply.status(500).send({ message: error.message });
    }
  }

  async login(request: FastifyRequest, reply: FastifyReply) {
    const parseResult = userSchema.safeParse(request.body);
    if (!parseResult.success) {
      return reply.status(400).send(parseResult.error.format());
    }

    const { username, password } = parseResult.data;

    try {
      const token = await this.authService.login(username, password);
      reply.send({ token });
    } catch (error: any) {
      reply.status(400).send({ message: error.message });
    }
  }
}
