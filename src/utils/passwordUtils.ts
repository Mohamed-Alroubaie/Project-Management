import bcrypt from 'bcrypt';

export async function hashPassword(password: string): Promise<string> {
  const hashedPassword = await bcrypt.hash(password, 10);
  return hashedPassword;
}

export async function comparePasswords(
  plainPassword: string,
  hashedPassword: string
): Promise<boolean> {
  const match = await bcrypt.compare(plainPassword, hashedPassword);
  return match;
}
