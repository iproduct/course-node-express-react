import { Schema, model, Document } from 'mongoose';

export interface IUserDocument extends Document {
  _id: string;
  username: string;
  passwordHash: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  imageUrl: string;
}

const UserSchema = new Schema<IUserDocument>(
  {
    _id: { type: String, required: true },
    username: { type: String, required: true, unique: true, index: true },
    passwordHash: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true, index: true },
    role: { type: String, required: true, enum: ['admin', 'author', 'reader'] },
    imageUrl: { type: String, default: '' },
  },
  {
    timestamps: true,
  }
);

export const UserModel = model<IUserDocument>('User', UserSchema);
