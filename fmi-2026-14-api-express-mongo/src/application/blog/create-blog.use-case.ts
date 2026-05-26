import { IBlogRepository } from '../../domain/blog/blog.repository';
import { Blog } from '../../domain/blog/blog.entity';
import { IUserRepository } from '../../domain/user/user.repository';
import { EntityNotFoundException, ValidationException } from '../../domain/common/domain-exception';

export interface CreateBlogDTO {
  title: string;
  content: string;
  userId: string;
  category: string;
  published: boolean;
  imageUrl?: string;
  keywords?: string[];
}

export class CreateBlogUseCase {
  constructor(
    private readonly blogRepo: IBlogRepository,
    private readonly userRepo: IUserRepository
  ) {}

  async execute(dto: CreateBlogDTO): Promise<Blog> {
    const author = await this.userRepo.findById(dto.userId);
    if (!author) {
      throw new EntityNotFoundException('User (Author)', dto.userId);
    }

    if (author.role === 'reader') {
      throw new ValidationException('Users with role "reader" are not allowed to create blogs.');
    }

    const blog = new Blog({
      title: dto.title,
      content: dto.content,
      userId: dto.userId,
      category: dto.category,
      published: dto.published,
      imageUrl: dto.imageUrl || '',
      keywords: dto.keywords || [],
    });

    await this.blogRepo.save(blog);
    return blog;
  }
}
