import { Request, Response, NextFunction } from 'express';
import { RegisterUseCase } from '../../application/user/register.use-case';
import { LoginUseCase } from '../../application/user/login.use-case';
import { GetUserByIdUseCase } from '../../application/user/get-user-by-id.use-case';

export class AuthController {
  constructor(
    private readonly registerUseCase: RegisterUseCase,
    private readonly loginUseCase: LoginUseCase,
    private readonly getUserByIdUseCase: GetUserByIdUseCase
  ) {}

  register = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const user = await this.registerUseCase.execute(req.body);
      res.status(201).json(user.toPlain());
    } catch (error) {
      next(error);
    }
  };

  login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const result = await this.loginUseCase.execute(req.body);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  };

  getProfile = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = (req as any).user?.userId;
      if (!userId) {
        res.status(401).json({ error: 'Unauthorized' });
        return;
      }
      const user = await this.getUserByIdUseCase.execute(userId);
      res.status(200).json(user.toPlain());
    } catch (error) {
      next(error);
    }
  };
}
