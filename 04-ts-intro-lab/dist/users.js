export var Role;
(function (Role) {
    Role[Role["AUTHOR"] = 1] = "AUTHOR";
    Role[Role["READER"] = 2] = "READER";
    Role[Role["ADMIN"] = 3] = "ADMIN";
})(Role || (Role = {}));
export class UserBase {
    constructor(firstName, lastName, email, password, roles, contact) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.roles = roles;
        this.contact = contact;
        this.id = undefined;
    }
    get salutation() {
        return `Hello ${this.firstName} ${this.lastName} in roles: ${this.roles.map(r => Role[r]).join(', ')}`;
    }
    toString() {
        return `ID: ${this.id}, ${this.salutation}`;
    }
}
export class Reader extends UserBase {
    constructor(firstName, lastName, email, password, roles = [Role.READER], contact) {
        super(firstName, lastName, email, password, roles, contact);
    }
    toString() {
        return `READER: ${super.toString()}`;
    }
}
export class Author extends UserBase {
    constructor(firstName, lastName, email, password, roles = [Role.AUTHOR], contact) {
        super(firstName, lastName, email, password, roles, contact);
    }
    toString() {
        return `AUTHOR: ${super.toString()}`;
    }
}
export class Admin extends UserBase {
    constructor(firstName, lastName, email, password, roles = [Role.ADMIN], contact) {
        super(firstName, lastName, email, password, roles, contact);
    }
    toString() {
        return `ADMIN: ${super.toString()}`;
    }
}
//# sourceMappingURL=users.js.map