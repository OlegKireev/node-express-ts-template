import { type Request, type Response } from 'express';
import { User } from '../models';
import { handleError } from '../utils';

const login = async (req: Request, res: Response) => {
  try {
    const { login: userLogin, password } = req.body;
    const user = await User.findOne({ username: userLogin });

    if (!user) {
      res.status(500).json({ error: `Can't find user with login ${userLogin}` });
    }

    if (password === user?.password) {
      res.status(200).send('token abc');
    } else {
      res.status(500).json({ error: 'Password is incorrect' });
    }
  } catch (err) {
    if (err instanceof Error) {
      handleError(res, err);
    }
  }
};

export default {
  login,
};
