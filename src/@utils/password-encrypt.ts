import bcrypt from "bcrypt";

export async function hashPassword(password: string): Promise<string> {
  const hash = await bcrypt.hash(password, 10);

  return hash;
}

export async function verifyPassword(
  password: string,
  hash: string
): Promise<boolean> {
  return await bcrypt.compare(password, hash);
}
