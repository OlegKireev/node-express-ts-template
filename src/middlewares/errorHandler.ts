import { type NextFunction, type Request, type Response } from 'express';
import { colors } from '../utils';

export const errorHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.error(colors.error(error.message));
  res.status(500).json({ error: 'Something went wrong' });
};
