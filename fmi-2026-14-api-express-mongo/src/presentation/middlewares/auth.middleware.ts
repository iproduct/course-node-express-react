import { Request, Response, NextFunction } from 'express';
import { JwtTokenService } from '../../infrastructure/security/jwt-token.service';

export interface AuthenticatedRequest extends Request {
  user?: {
    userId: string;
    role: string;
  };
}

const jwtService = new JwtTokenService();

export function authenticate(req: AuthenticatedRequest, res: Response, next: NextFunction): void {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ error: 'Authentication token required.' });
    return;
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwtService.verify(token);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid or expired token.' });
  }
}

export function optionalAuthenticate(req: AuthenticatedRequest, res: Response, next: NextFunction): void {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.split(' ')[1];
    try {
      const decoded = jwtService.verify(token);
      req.user = decoded;
    } catch (error) {
      // Treat as guest if token is invalid in optional context
    }
  }
  next();
}

export function requireRoles(roles: string[]) {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
    if (!req.user) {
      res.status(401).json({ error: 'Authentication required.' });
      return;
    }
    if (!roles.includes(req.user.role)) {
      res.status(403).json({ error: 'Forbidden: Insufficient privileges.' });
      return;
    }
    next();
  };
}
