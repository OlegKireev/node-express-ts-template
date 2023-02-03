import { model, Schema } from 'mongoose';

export interface IUser {
  username: string;
  password: string;
  role: string;
}

const userSchema = new Schema<IUser>({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
}, { timestamps: true });

export const User = model<IUser>('User', userSchema);
