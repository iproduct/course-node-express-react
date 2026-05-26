import { IUserRepository } from '../../domain/user/user.repository';
import { ValidationException } from '../../domain/common/domain-exception';
import { BcryptPasswordService } from '../../infrastructure/security/bcrypt-password.service';
import { JwtTokenService } from '../../infrastructure/security/jwt-token.service';

export interface LoginDTO {
  usernameOrEmail: string;
  passwordHash: string;
}

export interface LoginResponse {
  token: string;
  user: {
    id: string;
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    role: string;
    imageUrl: string;
  };
}

export class LoginUseCase {
  constructor(
    private readonly userRepo: IUserRepository,
    private readonly passwordService: BcryptPasswordService,
    private readonly jwtService: JwtTokenService
  ) {}

  async execute(dto: LoginDTO): Promise<LoginResponse> {
    let user = await this.userRepo.findByUsername(dto.usernameOrEmail);
    if (!user) {
      user = await this.userRepo.findByEmail(dto.usernameOrEmail);
    }

    if (!user) {
      throw new ValidationException('Invalid credentials.');
    }

    const isMatch = await this.passwordService.compare(dto.passwordHash, user.password);
    if (!isMatch) {
      throw new ValidationException('Invalid credentials.');
    }

    const token = this.jwtService.generate({
      userId: user.id,
      role: user.role,
    });

    return {
      token,
      user: user.toPlain(),
    };
  }
}
