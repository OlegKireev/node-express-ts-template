import { type Response } from 'express';

export const handleError = (res: Response, error: unknown) => {
  if (error instanceof Error) {
    return res.status(500).send({
      error: error.message,
    });
  }
  return res.status(500).send({
    error: 'an unknown error',
  });
};
