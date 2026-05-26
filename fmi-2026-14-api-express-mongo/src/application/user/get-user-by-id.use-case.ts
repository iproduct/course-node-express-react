import { IUserRepository } from '../../domain/user/user.repository';
import { User } from '../../domain/user/user.entity';
import { EntityNotFoundException } from '../../domain/common/domain-exception';

export class GetUserByIdUseCase {
  constructor(private readonly userRepo: IUserRepository) {}

  async execute(id: string): Promise<User> {
    const user = await this.userRepo.findById(id);
    if (!user) {
      throw new EntityNotFoundException('User', id);
    }
    return user;
  }
}
