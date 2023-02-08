import { type Request, type Response } from 'express';
import { User } from '../models';
import { ExpressError, handleError, hashPassword } from '../utils';

const getAll = (req: Request, res: Response) => {
  User.find()
    .sort({ createdAt: -1 })
    .then((posts) => {
      res.status(200).json({ data: posts });
    })
    .catch((err) => {
      handleError(res, err);
    });
};

const getById = (req: Request, res: Response) => {
  const { id } = req.params;

  User.findById(id)
    .then((post) => {
      res.status(200).json({ data: post });
    })
    .catch((err) => {
      handleError(res, err);
    });
};

const create = async (req: Request, res: Response) => {
  try {
    const { username, password, role } = req.body;
    const hashedPassword = await hashPassword(password);
    const newUser = new User({
      username,
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

const updateById = (req: Request, res: Response) => {
  const { username, password, role } = req.body;
  const { id } = req.params;

  User
    .findByIdAndUpdate(id, { username, password, role }, { new: true })
    .then((post) => {
      res.status(200).json({ data: post });
    })
    .catch((err) => {
      handleError(res, err);
    });
};

const deleteById = (req: Request, res: Response) => {
  const { id } = req.params;

  User.findByIdAndDelete(id)
    .then((user) => {
      if (user) {
        res.status(200).json(user._id);
      } else {
        throw new ExpressError({
          message: `There is no user with id ${id}`,
        });
      }
    })
    .catch((err) => {
      handleError(res, err);
    });
};

export default {
  getAll,
  create,
  getById,
  updateById,
  deleteById,
};
