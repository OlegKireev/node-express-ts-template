import { compare, hash } from 'bcrypt';
import { sign, verify } from 'jsonwebtoken';
import { CONFIG } from '../config';
import { JWT_SECRET } from '../constants';

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

export const createToken = async <T extends object>(payload: T) => {
  const token = await sign(payload, JWT_SECRET, { expiresIn: CONFIG.authorizationExpired });
  return token;
};

export const checkToken = async (token: string): Promise<boolean> => {
  try {
    const decoded = await verify(token, JWT_SECRET);
    if (decoded) {
      return true;
    }
  } catch (err) {
    if (err instanceof Error) {
      console.error(err.message);
    }
  }
  return false;
};
