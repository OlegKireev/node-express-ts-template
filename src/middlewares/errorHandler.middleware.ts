import { type NextFunction, type Request, type Response } from 'express';
import { createError } from '../utils';

export const errorHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => res.status(500).json(createError({ code: 500 }));
