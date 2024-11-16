import { z } from "zod";

export const userSchema = z.object({
  username: z.string(),
  password: z.string(),
  email: z.string().optional(),
});

export const userSaveSchema = z.object({
  uuid: z.string().optional(),
  username: z.string(),
  password: z.string(),
  email: z.string().optional(),
});
