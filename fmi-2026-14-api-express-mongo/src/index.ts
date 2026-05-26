import dotenv from 'dotenv';
import { createApp } from './presentation/app';
import { connectDatabase } from './infrastructure/db/connection';
import { logger } from './infrastructure/logging/logger';

dotenv.config();

const port = process.env.PORT || 4000;
const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/blogs-db';

async function startServer() {
  await connectDatabase(mongoUri);

  const app = createApp();

  app.listen(port, () => {
    logger.info(`Blogs API server is running on http://localhost:${port}`);
  });
}

startServer().catch((error) => {
  logger.error('Fatal server boot error:', error);
  process.exit(1);
});
