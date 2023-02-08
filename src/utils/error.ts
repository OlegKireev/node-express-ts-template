import { type Response } from 'express';
import { STATUS } from '../constants';
import { colors } from './colors';

interface IErrorParams {
  code?: number;
  message?: string;
  parameter?: string | null;
}

export class ExpressError {
  code: number;

  message: string;

  parameter: string | null;

  constructor({ code, message, parameter }: IErrorParams) {
    this.code = code || 500;
    this.message = message || 'Something went wrong';
    this.parameter = parameter || null;
  }
}

export const createError = ({
  message,
  code,
  parameter,
}: IErrorParams = {}) => ({
  type: 'error',
  message: message ?? 'Something went wrong',
  code: code ?? 500,
  parameter: parameter ?? null,
});

export const handleError = (res: Response, error: unknown) => {
  if (error instanceof ExpressError) {
    console.error(colors.error(error.message));
    return res
      .status(error.code)
      .json(createError({
        message: error.message,
        code: error.code,
      }));
  }

  if (error instanceof Error) {
    console.error(colors.error(error.message));
    return res
      .status(STATUS.INTERNAL_SERVER_ERROR)
      .send(createError({
        message: error.message,
      }));
  }

  console.error(colors.error('Something went wrong'));
  return res
    .status(STATUS.INTERNAL_SERVER_ERROR)
    .send(createError());
};
