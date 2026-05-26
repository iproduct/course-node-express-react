import jwt from 'jsonwebtoken';

export interface TokenPayload {
  userId: string;
  role: string;
}

export class JwtTokenService {
  private readonly secret: string;
  private readonly expiresIn: string;

  constructor() {
    this.secret = process.env.JWT_SECRET || 'fallback_secret_key';
    this.expiresIn = process.env.JWT_EXPIRES_IN || '7d';
  }

  generate(payload: TokenPayload): string {
    return jwt.sign(payload, this.secret, { expiresIn: this.expiresIn as jwt.SignOptions['expiresIn'] });
  }

  verify(token: string): TokenPayload {
    try {
      return jwt.verify(token, this.secret) as TokenPayload;
    } catch (error) {
      throw new Error('Invalid or expired token');
    }
  }
}
