import { Router } from 'express';
import { user } from '../controllers';

export const userRouter = Router();

userRouter.get('/api/users', user.getAll);
userRouter.post('/api/users', user.create);
userRouter.get('/api/users/:id', user.getById);
userRouter.put('/api/users/:id', user.updateById);
userRouter.delete('/api/users/:id', user.deleteById);
