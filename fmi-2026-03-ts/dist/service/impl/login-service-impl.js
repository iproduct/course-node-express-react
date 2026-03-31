export class LoginServiceImpl {
    constructor(userRepo) {
        this.userRepo = userRepo;
    }
    login(email, pass) {
        let mail;
        let password;
        if (typeof email === "string") {
            mail = email;
            password = pass ? pass : "";
        }
        else {
            mail = email.email;
            password = email.password;
        }
        const user = this.userRepo.findByEmail(mail);
        if (user && user.password === password) {
            return user;
        }
    }
    logout() {
        throw new Error("Method not implemented.");
    }
}
//# sourceMappingURL=login-service-impl.js.map