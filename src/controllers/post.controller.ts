import { type Request, type Response } from 'express';
import { Post } from '../models';
import { ExpressError, handleError } from '../utils';

const getAll = async (req: Request, res: Response) => {
  try {
    const posts = await Post
      .find()
      .sort({ createdAt: -1 });
    return res.status(200).json({ data: posts });
  } catch (err) {
    handleError(res, err);
  }
};

const getById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const post = await Post.findById(id);
    return res.status(200).json({ data: post });
  } catch (err) {
    handleError(res, err);
  }
};

const create = async (req: Request, res: Response) => {
  try {
    const { title, author, text } = req.body;
    const newPost = new Post({ title, author, text });
    const post = await newPost.save();
    return res.status(200).json({ data: post });
  } catch (err) {
    handleError(res, err);
  }
};

const updateById = async (req: Request, res: Response) => {
  try {
    const { title, author, text } = req.body;
    const { id } = req.params;
    const post = await Post.findByIdAndUpdate(id, { title, author, text }, { new: true });
    return res.status(200).json({ data: post });
  } catch (err) {
    handleError(res, err);
  }
};

const deleteById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const post = await Post.findByIdAndDelete(id);
    if (post) {
      return res.status(200).json(post._id);
    }
    throw new ExpressError({
      message: `There is no post with id ${id}`,
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
