import { Router } from 'express';
import { post } from '../controllers';

export const postsRouter = Router();

postsRouter.get('/api/posts', post.getAll);
postsRouter.post('/api/posts', post.create);
postsRouter.get('/api/posts/:id', post.getById);
postsRouter.put('/api/posts/:id', post.updateById);
postsRouter.delete('/api/posts/:id', post.deleteById);
