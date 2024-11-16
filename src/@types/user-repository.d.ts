import type { User } from "models/user";

declare module "user-repository" {
  export type UserRepository = {
    findById: (id: string) => Promise<User | null>;
  };
}
