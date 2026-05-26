import { Router } from 'express';
import { BlogController } from '../controllers/blog.controller';
import { CreateBlogUseCase } from '../../application/blog/create-blog.use-case';
import { UpdateBlogUseCase } from '../../application/blog/update-blog.use-case';
import { DeleteBlogUseCase } from '../../application/blog/delete-blog.use-case';
import { GetBlogByIdUseCase } from '../../application/blog/get-blog-by-id.use-case';
import { GetBlogsUseCase } from '../../application/blog/get-blogs.use-case';
import { MongoBlogRepository } from '../../infrastructure/repositories/mongo-blog.repository';
import { MongoUserRepository } from '../../infrastructure/repositories/mongo-user.repository';
import { authenticate, optionalAuthenticate, requireRoles } from '../middlewares/auth.middleware';
import { validateBody, validateQuery } from '../middlewares/validation.middleware';
import { blogCreateSchema, blogUpdateSchema } from '../schemas/blog-create.schema';
import { blogQuerySchema } from '../schemas/blog-query.schema';

export function createBlogRouter(): Router {
  const router = Router();

  const blogRepo = new MongoBlogRepository();
  const userRepo = new MongoUserRepository();

  const createBlogUseCase = new CreateBlogUseCase(blogRepo, userRepo);
  const updateBlogUseCase = new UpdateBlogUseCase(blogRepo);
  const deleteBlogUseCase = new DeleteBlogUseCase(blogRepo);
  const getBlogByIdUseCase = new GetBlogByIdUseCase(blogRepo);
  const getBlogsUseCase = new GetBlogsUseCase(blogRepo);

  const controller = new BlogController(
    createBlogUseCase,
    updateBlogUseCase,
    deleteBlogUseCase,
    getBlogByIdUseCase,
    getBlogsUseCase
  );

  router.get(
    '/',
    optionalAuthenticate,
    validateQuery(blogQuerySchema),
    controller.list
  );

  router.get('/:id', optionalAuthenticate, controller.getById);

  router.post(
    '/',
    authenticate,
    requireRoles(['author', 'admin']),
    validateBody(blogCreateSchema),
    controller.create
  );

  router.put(
    '/:id',
    authenticate,
    requireRoles(['author', 'admin']),
    validateBody(blogUpdateSchema),
    controller.update
  );

  router.delete(
    '/:id',
    authenticate,
    requireRoles(['author', 'admin']),
    controller.delete
  );

  return router;
}
