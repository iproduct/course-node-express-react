import { RepositoryImpl } from './repository.js';
export class UserRepositoryImpl extends RepositoryImpl {
    findByEmail(email) {
        const allUsers = this.findAll();
        for (const user of allUsers) {
            if (user.email === email)
                return user;
        }
        return undefined;
    }
}
//# sourceMappingURL=user-repository.js.map