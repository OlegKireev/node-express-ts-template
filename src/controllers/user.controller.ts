import { type Request, type Response } from 'express';
import { User } from '../models';
import { ExpressError, handleError, hashPassword } from '../utils';

const getAll = async (req: Request, res: Response) => {
  try {
    const users = await User.find()
      .sort({ createdAt: -1 });
    return res.status(200).json({ data: users });
  } catch (err) {
    handleError(res, err);
  }
};

const getById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    return res.status(200).json({ data: user });
  } catch (err) {
    handleError(res, err);
  }
};

const create = async (req: Request, res: Response) => {
  try {
    const { login, password, role } = req.body;
    const hashedPassword = await hashPassword(password);
    const newUser = new User({
      login,
      password: hashedPassword,
      role,
    });

    const user = await newUser.save();
    if (user) {
      return res.status(200).json({ data: user });
    }
  } catch (err) {
    handleError(res, err);
  }
};

const updateById = async (req: Request, res: Response) => {
  try {
    const { login, password, role } = req.body;
    const { id } = req.params;
    let hashedPassword;
    if (password) {
      hashedPassword = await hashPassword(password);
    }
    const user = await User.findByIdAndUpdate(id, {
      login,
      password: hashedPassword,
      role,
    }, { new: true });
    return res.status(200).json({ data: user });
  } catch (err) {
    handleError(res, err);
  }
};

const deleteById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndDelete(id);
    if (user) {
      return res.status(200).json(user._id);
    }
    throw new ExpressError({
      message: `There is no user with id ${id}`,
    });
  } catch (err) {
    handleError(res, err);
  }
};

export default {
  getAll,
  create,
  getById,
  updateById,
  deleteById,
};
