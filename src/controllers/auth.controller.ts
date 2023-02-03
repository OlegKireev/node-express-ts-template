import { type Request, type Response } from 'express';
import { createToken } from '../utils/hash';
import { User } from '../models';
import { checkPassword, handleError } from '../utils';

const login = async (req: Request, res: Response) => {
  try {
    const { login: userLogin, password } = req.body;
    const user = await User.findOne({ username: userLogin });

    if (!user) {
      return res.status(500).json({ error: `Can't find user with login ${userLogin}` });
    }

    const isPasswordsCompared = await checkPassword(password, user?.password);
    if (isPasswordsCompared) {
      const token = await createToken({
        login: user.username,
        role: user.role,
      });

      return res.status(200).send(token);
    }
    return res.status(500).json({ error: 'Password is incorrect' });
  } catch (err) {
    handleError(res, err);
  }
};

export default {
  login,
};
