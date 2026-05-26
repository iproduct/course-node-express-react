import mongoose from 'mongoose';
import { logger } from '../logging/logger';

export async function connectDatabase(uri: string): Promise<void> {
  try {
    await mongoose.connect(uri);
    logger.info('Connected to MongoDB successfully.');
  } catch (error) {
    logger.error('Failed to connect to MongoDB:', error);
    process.exit(1);
  }
}

export async function disconnectDatabase(): Promise<void> {
  await mongoose.disconnect();
  logger.info('Disconnected from MongoDB.');
}
