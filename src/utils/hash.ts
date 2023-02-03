import { compare, hash } from 'bcrypt';

export const hashPassword = async (password: string) => {
  const hashedPassord = await hash(password, 10);
  return hashedPassord;
};

export const checkPassword = async (
  password: string,
  passwordHash: string,
) => {
  const isCompared = await compare(password, passwordHash);
  return isCompared;
};
