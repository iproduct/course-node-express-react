import { IBlogRepository } from '../../domain/blog/blog.repository';
import { EntityNotFoundException, ValidationException } from '../../domain/common/domain-exception';

export interface DeleteBlogDTO {
  blogId: string;
  requestingUserId: string;
  requestingUserRole: string;
}

export class DeleteBlogUseCase {
  constructor(private readonly blogRepo: IBlogRepository) {}

  async execute(dto: DeleteBlogDTO): Promise<void> {
    const blog = await this.blogRepo.findById(dto.blogId);
    if (!blog) {
      throw new EntityNotFoundException('Blog', dto.blogId);
    }

    if (dto.requestingUserRole !== 'admin' && blog.userId !== dto.requestingUserId) {
      throw new ValidationException('You do not have permission to delete this blog.');
    }

    await this.blogRepo.delete(dto.blogId);
  }
}
