import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

export const ROOT = path.resolve(__dirname, '..');

export const { PORT } = process.env;
export const { DB_CONNECT } = process.env;
export const { JWT_SECRET } = process.env;
