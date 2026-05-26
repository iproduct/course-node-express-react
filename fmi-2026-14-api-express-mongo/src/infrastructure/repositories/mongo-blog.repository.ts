import { IBlogRepository, BlogFilters } from '../../domain/blog/blog.repository';
import { Blog } from '../../domain/blog/blog.entity';
import { BlogModel, IBlogDocument } from '../db/schemas/blog.schema';

export class MongoBlogRepository implements IBlogRepository {
  private toDomain(doc: IBlogDocument): Blog {
    return new Blog(
      {
        title: doc.title,
        content: doc.content,
        userId: doc.userId,
        category: doc.category,
        published: doc.published,
        imageUrl: doc.imageUrl,
        keywords: doc.keywords,
      },
      doc._id
    );
  }

  async findById(id: string): Promise<Blog | null> {
    const doc = await BlogModel.findById(id).exec();
    if (!doc) return null;
    return this.toDomain(doc);
  }

  async findAll(filters: BlogFilters): Promise<Blog[]> {
    const query: any = {};

    if (filters.userId) {
      query.userId = filters.userId;
    }

    if (filters.category) {
      query.category = filters.category;
    }

    if (filters.published !== undefined && filters.published !== '') {
      query.published = filters.published === 'true';
    }

    if (filters.q) {
      const regex = new RegExp(filters.q, 'i');
      query.$or = [
        { title: { $regex: regex } },
        { content: { $regex: regex } },
        { keywords: { $in: [regex] } }
      ];
    }

    const docs = await BlogModel.find(query).sort({ createdAt: -1 }).exec();
    return docs.map((doc) => this.toDomain(doc));
  }

  async save(blog: Blog): Promise<void> {
    await BlogModel.findByIdAndUpdate(
      blog.id,
      {
        _id: blog.id,
        title: blog.title,
        content: blog.content,
        userId: blog.userId,
        category: blog.category,
        published: blog.published,
        imageUrl: blog.imageUrl,
        keywords: blog.keywords,
      },
      { upsert: true, new: true }
    ).exec();
  }

  async delete(id: string): Promise<void> {
    await BlogModel.findByIdAndDelete(id).exec();
  }
}
