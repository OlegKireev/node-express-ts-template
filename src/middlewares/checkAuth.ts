import { type Request, type Response, type NextFunction } from 'express';
import { checkToken } from '../utils/hash';

const PUBLIC_ROUTES: Record<string, string[]> = {
  '/': ['GET'],
  '/api/auth/login': ['POST'],
};

const publicPaths = Object.keys(PUBLIC_ROUTES);

export const checkAuth = async (req: Request, res: Response, next: NextFunction) => {
  if ((!publicPaths.includes(req.path)
    || !PUBLIC_ROUTES[req.path].includes(req.method))
    && req.method !== 'OPTIONS') {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ error: 'Yor are not authorized' });
    }

    const isTokenValid = await checkToken(token);
    if (!isTokenValid) {
      return res.status(401).json({ error: 'Yor are not authorized' });
    }
  }

  return next();
};
