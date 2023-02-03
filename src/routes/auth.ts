import { Router } from 'express';
import { auth } from '../controllers';

export const authRouter = Router();

authRouter.post('/api/auth/login', auth.login);
