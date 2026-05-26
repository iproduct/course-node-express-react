import { Request, Response, NextFunction } from 'express';
import { DomainException, EntityNotFoundException, ValidationException } from '../../domain/common/domain-exception';
import { logger } from '../../infrastructure/logging/logger';

export function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void {
  logger.error(`${req.method} ${req.path} - Error: ${err.message}`, { stack: err.stack });

  if (err instanceof EntityNotFoundException) {
    res.status(404).json({ error: err.message });
    return;
  }

  if (err instanceof ValidationException) {
    res.status(400).json({ error: err.message });
    return;
  }

  if (err instanceof DomainException) {
    res.status(400).json({ error: err.message });
    return;
  }

  const response: any = { error: 'Internal Server Error' };
  if (process.env.NODE_ENV === 'development') {
    response.details = err.message;
    response.stack = err.stack;
  }

  res.status(500).json(response);
}
