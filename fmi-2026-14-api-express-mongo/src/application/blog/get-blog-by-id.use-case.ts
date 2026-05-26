import { IBlogRepository } from '../../domain/blog/blog.repository';
import { Blog } from '../../domain/blog/blog.entity';
import { EntityNotFoundException, ValidationException } from '../../domain/common/domain-exception';

export class GetBlogByIdUseCase {
  constructor(private readonly blogRepo: IBlogRepository) {}

  async execute(id: string, requestingUserId?: string, requestingUserRole?: string): Promise<Blog> {
    const blog = await this.blogRepo.findById(id);
    if (!blog) {
      throw new EntityNotFoundException('Blog', id);
    }

    if (!blog.published) {
      if (!requestingUserId || (requestingUserRole !== 'admin' && blog.userId !== requestingUserId)) {
        throw new ValidationException('This blog post is a draft and is not accessible.');
      }
    }

    return blog;
  }
}
