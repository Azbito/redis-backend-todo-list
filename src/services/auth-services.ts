import { FastifyInstance } from "fastify";
import { UserRepository } from "repositories/user-repositories";
import { hashPassword, verifyPassword } from "@utils/password-encrypt";
import type { User } from "models/user";

export class AuthService {
  constructor(
    private userRepository: UserRepository,
    private fastify: FastifyInstance
  ) {}

  async register(user: User): Promise<void> {
    const existingUser = await this.userRepository.getUserByUsername(
      user.username
    );

    if (existingUser) {
      throw new Error("Usuário já existe");
    }

    const hashedPassword = await hashPassword(user.password);

    if (hashedPassword) {
      await this.userRepository.saveUser({
        ...user,
        password: hashedPassword,
      });
    }
  }

  async login(username: string, password: string): Promise<string> {
    const user = await this.userRepository.getUserByUsername(username);
    if (!user) {
      throw new Error("Usuário não encontrado");
    }

    const isPasswordValid = await verifyPassword(password, user.password);

    if (!isPasswordValid) {
      throw new Error("Senha incorreta");
    }

    return this.fastify.jwt.sign(
      { sub: username, username },
      { expiresIn: "7d" }
    );
  }
}
