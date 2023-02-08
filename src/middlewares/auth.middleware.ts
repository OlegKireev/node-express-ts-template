import { type Request, type Response, type NextFunction } from 'express';
import { handleError, ExpressError, checkToken } from '../utils';
import { STATUS } from '../constants';

const PUBLIC_ROUTES: Record<string, string[]> = {
  '/': ['GET'],
  '/api/auth/login': ['POST'],
};

const publicPaths = Object.keys(PUBLIC_ROUTES);

export const auth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if ((!publicPaths.includes(req.path)
      || !PUBLIC_ROUTES[req.path].includes(req.method))
      && req.method !== 'OPTIONS') {
      const token = req.headers.authorization?.split(' ')[1];
      if (!token) {
        throw new ExpressError({
          code: STATUS.UNAUTHORIZED,
          message: 'You are not authorized',
        });
      }

      const isTokenValid = await checkToken(token);
      if (!isTokenValid) {
        throw new ExpressError({
          code: STATUS.UNAUTHORIZED,
          message: 'You are not authorized',
        });
      }
    }
    return next();
  } catch (err) {
    handleError(res, err);
  }
};
