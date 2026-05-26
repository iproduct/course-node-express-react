import { IUserRepository } from '../../domain/user/user.repository';
import { User, UserRole } from '../../domain/user/user.entity';
import { ValidationException } from '../../domain/common/domain-exception';
import { BcryptPasswordService } from '../../infrastructure/security/bcrypt-password.service';

export interface RegisterUserDTO {
  username: string;
  email: string;
  passwordHash: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  imageUrl?: string;
}

export class RegisterUseCase {
  constructor(
    private readonly userRepo: IUserRepository,
    private readonly passwordService: BcryptPasswordService
  ) {}

  async execute(dto: RegisterUserDTO): Promise<User> {
    const existingEmail = await this.userRepo.findByEmail(dto.email);
    if (existingEmail) {
      throw new ValidationException('Email is already registered.');
    }

    const existingUsername = await this.userRepo.findByUsername(dto.username);
    if (existingUsername) {
      throw new ValidationException('Username is already taken.');
    }

    if (!dto.passwordHash || dto.passwordHash.length < 6) {
      throw new ValidationException('Password must be at least 6 characters long.');
    }

    const hashedPassword = await this.passwordService.hash(dto.passwordHash);

    const user = new User({
      username: dto.username,
      password: hashedPassword,
      firstName: dto.firstName,
      lastName: dto.lastName,
      email: dto.email,
      role: dto.role,
      imageUrl: dto.imageUrl || '',
    });

    await this.userRepo.save(user);
    return user;
  }
}
