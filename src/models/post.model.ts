import { Schema, model } from 'mongoose';

export interface IPost {
  text: string;
  title: string;
  author: string;
}

const postSchema = new Schema<IPost>({
  text: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
}, { timestamps: true });

export const Post = model<IPost>('Post', postSchema);
