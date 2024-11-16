import type { User } from "models/user";

export interface UserRepository {
  findById(id: string): Promise<User | null>;
}
