import { FastifyInstance } from "fastify";
import { userSaveSchema, userSchema } from "@/schemas/user-schemas.js";
import { verifyPassword } from "@/@utils/password-encrypt.js";
import type { User } from "@/models/user.js";

export class UserRepository {
  constructor(private readonly fastify: FastifyInstance) {}

  async getUserByUsername(username: string): Promise<User | null> {
    const userData = await this.fastify.redis.get(username);
    return userData ? JSON.parse(userData) : null;
  }

  async findById(uuid: string): Promise<User | null> {
    const userData = await this.fastify.redis.get(uuid);
    return userData ? JSON.parse(userData) : null;
  }

  async saveUser(user: User): Promise<void> {
    const parsedUser = userSaveSchema.parse(user);

    await this.fastify.redis.set(
      parsedUser.username,
      JSON.stringify({
        uuid: parsedUser.uuid,
        password: parsedUser.password,
      })
    );
  }

  async authenticateUser(
    username: string,
    password: string
  ): Promise<null | string> {
    const parsedCredentials = userSchema
      .pick({ username: true, password: true })
      .parse({ username, password });

    const user = await this.getUserByUsername(parsedCredentials.username);

    if (!user) {
      return null;
    }

    const isPasswordCorrect = await verifyPassword(
      user.password,
      parsedCredentials.password
    );

    if (!isPasswordCorrect) {
      return null;
    }

    const token = this.fastify.jwt.sign({ sub: user.uuid });

    return token;
  }
}
