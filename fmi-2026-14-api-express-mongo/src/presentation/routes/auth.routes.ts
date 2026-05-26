import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller';
import { RegisterUseCase } from '../../application/user/register.use-case';
import { LoginUseCase } from '../../application/user/login.use-case';
import { GetUserByIdUseCase } from '../../application/user/get-user-by-id.use-case';
import { MongoUserRepository } from '../../infrastructure/repositories/mongo-user.repository';
import { BcryptPasswordService } from '../../infrastructure/security/bcrypt-password.service';
import { JwtTokenService } from '../../infrastructure/security/jwt-token.service';
import { validateBody } from '../middlewares/validation.middleware';
import { userRegisterSchema } from '../schemas/user-register.schema';
import { userLoginSchema } from '../schemas/user-login.schema';
import { authenticate } from '../middlewares/auth.middleware';

export function createAuthRouter(): Router {
  const router = Router();

  const userRepo = new MongoUserRepository();
  const passwordService = new BcryptPasswordService();
  const jwtService = new JwtTokenService();

  const registerUseCase = new RegisterUseCase(userRepo, passwordService);
  const loginUseCase = new LoginUseCase(userRepo, passwordService, jwtService);
  const getUserByIdUseCase = new GetUserByIdUseCase(userRepo);

  const controller = new AuthController(registerUseCase, loginUseCase, getUserByIdUseCase);

  router.post('/register', validateBody(userRegisterSchema), controller.register);
  router.post('/login', validateBody(userLoginSchema), controller.login);
  router.get('/profile', authenticate, controller.getProfile);

  return router;
}
