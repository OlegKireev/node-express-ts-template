import { type Request, type Response } from 'express';
import { Post } from '../models';

// FIXME: move
const handleError = (res: Response, error: Error) => {
  res.status(500).send({
    error: error.message,
  });
};

const getAll = (req: Request, res: Response) => {
  Post.find()
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

  Post.findById(id)
    .then((post) => {
      res.status(200).json({ data: post });
    })
    .catch((err) => {
      handleError(res, err);
    });
};

const create = (req: Request, res: Response) => {
  const { title, author, text } = req.body;
  const newPost = new Post({ title, author, text });

  newPost
    .save()
    .then((post) => res.status(200).json({ data: post }))
    .catch((err) => {
      handleError(res, err);
    });
};

const updateById = (req: Request, res: Response) => {
  const { title, author, text } = req.body;
  const { id } = req.params;

  Post
    .findByIdAndUpdate(id, { title, author, text }, { new: true })
    .then((post) => {
      res.status(200).json({ data: post });
    })
    .catch((err) => {
      handleError(res, err);
    });
};

const deleteById = (req: Request, res: Response) => {
  const { id } = req.params;

  Post.findByIdAndDelete(id)
    .then(() => {
      res.status(200).json(id);
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
