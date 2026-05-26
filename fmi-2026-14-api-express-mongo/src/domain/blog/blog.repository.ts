import { Blog } from './blog.entity';

export interface BlogFilters {
  q?: string;
  userId?: string;
  category?: string;
  published?: string;
}

export interface IBlogRepository {
  findById(id: string): Promise<Blog | null>;
  findAll(filters: BlogFilters): Promise<Blog[]>;
  save(blog: Blog): Promise<void>;
  delete(id: string): Promise<void>;
}
