import { IBlogRepository, BlogFilters } from '../../domain/blog/blog.repository';
import { Blog } from '../../domain/blog/blog.entity';

export class GetBlogsUseCase {
  constructor(private readonly blogRepo: IBlogRepository) {}

  async execute(filters: BlogFilters, requestingUserId?: string, requestingUserRole?: string): Promise<Blog[]> {
    if (filters.published === 'false') {
      if (!requestingUserId || (requestingUserRole !== 'admin' && filters.userId !== requestingUserId)) {
        filters.published = 'true';
      }
    } else if (filters.published === undefined || filters.published === '') {
      if (requestingUserRole !== 'admin' && (!requestingUserId || filters.userId !== requestingUserId)) {
        filters.published = 'true';
      }
    }

    return this.blogRepo.findAll(filters);
  }
}
