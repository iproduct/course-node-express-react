import { IBlogRepository } from '../../domain/blog/blog.repository';
import { Blog } from '../../domain/blog/blog.entity';
import { EntityNotFoundException, ValidationException } from '../../domain/common/domain-exception';

export interface UpdateBlogDTO {
  blogId: string;
  requestingUserId: string;
  requestingUserRole: string;
  title?: string;
  content?: string;
  category?: string;
  published?: boolean;
  imageUrl?: string;
  keywords?: string[];
}

export class UpdateBlogUseCase {
  constructor(private readonly blogRepo: IBlogRepository) {}

  async execute(dto: UpdateBlogDTO): Promise<Blog> {
    const blog = await this.blogRepo.findById(dto.blogId);
    if (!blog) {
      throw new EntityNotFoundException('Blog', dto.blogId);
    }

    if (dto.requestingUserRole !== 'admin' && blog.userId !== dto.requestingUserId) {
      throw new ValidationException('You do not have permission to update this blog.');
    }

    blog.update({
      title: dto.title,
      content: dto.content,
      category: dto.category,
      published: dto.published,
      imageUrl: dto.imageUrl,
      keywords: dto.keywords,
    });

    await this.blogRepo.save(blog);
    return blog;
  }
}
