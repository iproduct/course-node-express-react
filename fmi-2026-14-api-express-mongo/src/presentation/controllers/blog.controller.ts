import { Response, NextFunction } from 'express';
import { AuthenticatedRequest } from '../middlewares/auth.middleware';
import { CreateBlogUseCase } from '../../application/blog/create-blog.use-case';
import { UpdateBlogUseCase } from '../../application/blog/update-blog.use-case';
import { DeleteBlogUseCase } from '../../application/blog/delete-blog.use-case';
import { GetBlogByIdUseCase } from '../../application/blog/get-blog-by-id.use-case';
import { GetBlogsUseCase } from '../../application/blog/get-blogs.use-case';

export class BlogController {
  constructor(
    private readonly createBlogUseCase: CreateBlogUseCase,
    private readonly updateBlogUseCase: UpdateBlogUseCase,
    private readonly deleteBlogUseCase: DeleteBlogUseCase,
    private readonly getBlogByIdUseCase: GetBlogByIdUseCase,
    private readonly getBlogsUseCase: GetBlogsUseCase
  ) {}

  create = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = req.user?.userId;
      if (!userId) {
        res.status(401).json({ error: 'Unauthorized' });
        return;
      }

      const blog = await this.createBlogUseCase.execute({
        ...req.body,
        userId,
      });

      res.status(201).json(blog.toPlain());
    } catch (error) {
      next(error);
    }
  };

  update = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const requestingUserId = req.user?.userId;
      const requestingUserRole = req.user?.role;
      if (!requestingUserId || !requestingUserRole) {
        res.status(401).json({ error: 'Unauthorized' });
        return;
      }

      const blog = await this.updateBlogUseCase.execute({
        blogId: req.params.id,
        requestingUserId,
        requestingUserRole,
        ...req.body,
      });

      res.status(200).json(blog.toPlain());
    } catch (error) {
      next(error);
    }
  };

  delete = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const requestingUserId = req.user?.userId;
      const requestingUserRole = req.user?.role;
      if (!requestingUserId || !requestingUserRole) {
        res.status(401).json({ error: 'Unauthorized' });
        return;
      }

      await this.deleteBlogUseCase.execute({
        blogId: req.params.id,
        requestingUserId,
        requestingUserRole,
      });

      res.status(204).send();
    } catch (error) {
      next(error);
    }
  };

  getById = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const requestingUserId = req.user?.userId;
      const requestingUserRole = req.user?.role;

      const blog = await this.getBlogByIdUseCase.execute(
        req.params.id,
        requestingUserId,
        requestingUserRole
      );

      res.status(200).json(blog.toPlain());
    } catch (error) {
      next(error);
    }
  };

  list = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const requestingUserId = req.user?.userId;
      const requestingUserRole = req.user?.role;

      const blogs = await this.getBlogsUseCase.execute(
        req.query as any,
        requestingUserId,
        requestingUserRole
      );

      res.status(200).json(blogs.map((b) => b.toPlain()));
    } catch (error) {
      next(error);
    }
  };
}
