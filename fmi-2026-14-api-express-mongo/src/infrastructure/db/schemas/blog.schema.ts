import { Schema, model, Document } from 'mongoose';

export interface IBlogDocument extends Document {
  _id: string;
  title: string;
  content: string;
  userId: string;
  category: string;
  published: boolean;
  imageUrl: string;
  keywords: string[];
}

const BlogSchema = new Schema<IBlogDocument>(
  {
    _id: { type: String, required: true },
    title: { type: String, required: true, index: true },
    content: { type: String, required: true },
    userId: { type: String, required: true, index: true },
    category: { type: String, required: true, index: true },
    published: { type: Boolean, required: true, default: false, index: true },
    imageUrl: { type: String, default: '' },
    keywords: { type: [String], default: [] },
  },
  {
    timestamps: true,
  }
);

export const BlogModel = model<IBlogDocument>('Blog', BlogSchema);
