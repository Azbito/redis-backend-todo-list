import { FastifyInstance } from "fastify";
import type { User } from "@/schemas/user-schemas";

export class UserRepository {
  constructor(private fastify: FastifyInstance) {}

  async getUserByUsername(username: string): Promise<User | null> {
    const userData = await this.fastify.redis.get(username);
    return userData ? JSON.parse(userData) : null;
  }

  async saveUser(user: User): Promise<void> {
    await this.fastify.redis.set(user.username, JSON.stringify(user));
  }

  async findById(id: string): Promise<User | null> {
    const user = await this.fastify.redis.get(id);
    return user ? JSON.parse(user) : null;
  }
}
