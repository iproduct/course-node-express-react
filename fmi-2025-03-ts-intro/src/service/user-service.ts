import { IdType } from "../common/common-types";
import { UserRepository } from "../dao/user-repository";
import { User, UserCreateDto } from "../model/user";

export interface UserService {
    addUser(userDto: UserCreateDto): User;
    getAllUsers(): User[];
    getUserById(id: IdType): User;
    updateUser(user: User): User;
    deleteUserById(id: IdType): User;
    getCount(): number;
}

export class UserServiceImpl implements UserService{
    constructor(private userRepo: UserRepository) {}
    addUser(userDto: UserCreateDto): User {
        return this.userRepo.create(userDto);
    }
    getAllUsers(): User[] {
        return this.userRepo.findAll();
    }
    getUserById(id: IdType): User {
        const user = this.userRepo.findById(id);
        if(user) {
            return user;
        }
        throw new Error(`User with ID=${id} does not exist.`);
    }
    updateUser(user: User): User {
        const updated = this.userRepo.update(user);
        if(updated) {
            return updated;
        }
        throw new Error(`User with ID=${user.id} does not exist.`);
    }
    deleteUserById(id: IdType): User {
        const deleted = this.userRepo.deleteById(id);
        if(deleted) {
            return deleted;
        }
        throw new Error(`User with ID=${id} does not exist.`);
    }
    getCount(): number {
        return this.userRepo.count();
    }

}