export class UserServiceImpl {
    constructor(userRepo) {
        this.userRepo = userRepo;
    }
    addUser(userDto) {
        return this.userRepo.create(userDto);
    }
    getAllUsers() {
        return this.userRepo.findAll();
    }
    getUserById(id) {
        const user = this.userRepo.findById(id);
        if (user) {
            return user;
        }
        throw new Error(`User with ID=${id} does not exist.`);
    }
    updateUser(user) {
        const updated = this.userRepo.update(user);
        if (updated) {
            return updated;
        }
        throw new Error(`User with ID=${user.id} does not exist.`);
    }
    deleteUserById(id) {
        const deleted = this.userRepo.deleteById(id);
        if (deleted) {
            return deleted;
        }
        throw new Error(`User with ID=${id} does not exist.`);
    }
    getCount() {
        return this.userRepo.count();
    }
}
