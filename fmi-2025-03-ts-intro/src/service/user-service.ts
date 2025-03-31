import { IdType, Optional } from "../common/common-types.js";
import { UserRepository } from "../dao/user-repository.js";
import { Credentials } from "../model/credentials.js";
import { User, UserCreateDto } from "../model/user.js";

export interface UserService {
    addUser(userDto: UserCreateDto): User;
    getAllUsers(): User[];
    getUserById(id: IdType): User;
    updateUser(user: User): User;
    deleteUserById(id: IdType): User;
    getCount(): number;
    login(email: string, pass: string): User;
    login(credentials: Credentials): User;
}

export class UserServiceImpl implements UserService{
    constructor(private userRepo: UserRepository) {}
    login(email: string, pass: string): User;
    login(credentials: Credentials): User;
    login(credentials: Credentials | string , pass?: string){
        let email, password: string;
        if(credentials instanceof Credentials) {
            email = credentials.email;
            password = credentials.password;
        } else {
            email = credentials;
            password = pass ? pass: '';
        }
        const user = this.userRepo.findByEmail(email);
        if(user) {
            if(user.password === password) {
                return user;
            } 
            throw new Error(`Invalid user password.`)
        } 
        throw new Error(`User with email '${email}' does not exist.`)
    }
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