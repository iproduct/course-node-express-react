import morgan, { StreamOptions } from 'morgan';
import { logger } from '../../infrastructure/logging/logger';

const stream: StreamOptions = {
  write: (message) => logger.http(message.trim()),
};

const skip = () => {
  const env = process.env.NODE_ENV || 'development';
  return env === 'test';
};

export const loggingMiddleware = morgan(
  ':remote-addr :method :url :status :res[content-length] - :response-time ms',
  { stream, skip }
);
