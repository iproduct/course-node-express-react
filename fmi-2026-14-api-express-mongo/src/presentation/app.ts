import express from 'express';
import cors from 'cors';
import { createAuthRouter } from './routes/auth.routes';
import { createBlogRouter } from './routes/blog.routes';
import { loggingMiddleware } from './middlewares/logging.middleware';
import { errorHandler } from './middlewares/error.middleware';

export function createApp(): express.Application {
  const app = express();

  app.use(cors());
  app.use(express.json());
  app.use(loggingMiddleware);

  app.get('/health', (req, res) => {
    res.status(200).json({ status: 'OK', timestamp: new Date().toISOString() });
  });

  app.use('/api/auth', createAuthRouter());
  app.use('/api/blogs', createBlogRouter());

  app.use(errorHandler);

  return app;
}
