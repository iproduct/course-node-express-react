import { User } from '../model/user.js';
import { Repository, RepositoryImpl } from './repository.js';

export interface UserRepository extends Repository<User> {
    findByEmail(email: string): User | undefined;
}

export class UserRepositoryImpl extends RepositoryImpl<User> implements UserRepository {
    findByEmail(email: string): User | undefined {
        const allUsers = this.findAll();
        for(const user of allUsers) {
            if (user.email === email)
                return user;
        }
        return undefined;
    }
}