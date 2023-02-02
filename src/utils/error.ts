import { type Response } from 'express';

export const handleError = (res: Response, error: Error) => {
  res.status(500).send({
    error: error.message,
  });
};
