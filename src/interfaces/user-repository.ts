import type { User } from "@/models/user";

export interface UserRepository {
  findById(id: string): Promise<User | null>;
  getUserByUsername(uuid: string): Promise<User | null>;
  saveUser(user: User): Promise<void>;
  authenticateUser(username: string, password: string): Promise<null | string>;
}
