import { type Request, type Response } from 'express';
import { User } from '../models';
import {
  checkPassword, handleError, ExpressError, createToken,
} from '../utils';
import { STATUS } from '../constants';

const login = async (req: Request, res: Response) => {
  try {
    const { login: userLogin, password } = req.body;
    const user = await User.findOne({ username: userLogin });

    if (!user) {
      throw new ExpressError({
        code: STATUS.OK,
        message: `Can't find user with login ${userLogin}`,
      });
    }

    const isPasswordsCompared = await checkPassword(password, user?.password);
    if (isPasswordsCompared) {
      const token = await createToken({
        login: user.username,
        role: user.role,
      });

      return res.status(STATUS.OK).send(token);
    }
    throw new ExpressError({
      code: STATUS.OK,
      message: 'Password is incorrect',
    });
  } catch (err) {
    handleError(res, err);
  }
};

export default {
  login,
};
