import { Repository, RepositoryInMemory } from './repository.js';
import { IdType, Optional } from './shared-types.js';
import { User } from './users.js';

export type FinderByString<V> = (str: string) => Optional<V>;

export interface FinderByStringI<V> {
    (str: string): Optional<V>;
}

export interface UserRepository extends Repository<IdType, User> {
    findByEmail: FinderByStringI<User>;
}

export class UserRepositoryInMemory extends RepositoryInMemory<IdType, User> implements UserRepository {
    findByEmail(email: string): Optional<User> {
        return this.findAll().find(user => user.email === email);
    }
}