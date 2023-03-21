export var Role;
(function (Role) {
    Role[Role["AUTHOR"] = 1] = "AUTHOR";
    Role[Role["READER"] = 2] = "READER";
    Role[Role["ADMIN"] = 3] = "ADMIN";
})(Role || (Role = {}));
export class UserBase {
    constructor(id, firstName, lastName, email, password, roles = [Role.READER], contact) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.roles = roles;
        this.contact = contact;
    }
    get salutation() {
        return `Hello ${this.firstName} ${this.lastName} in roles: ${this.roles.map(role => Role[role]).join(', ')}`;
    }
    toString() {
        return this.salutation;
    }
}
export class Reader extends UserBase {
    constructor(id, firstName, lastName, email, password, contact) {
        super(id, firstName, lastName, email, password, [Role.READER], contact);
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.contact = contact;
    }
    toString() {
        return `READER: ${super.toString()}`;
    }
}
export class Author extends UserBase {
    constructor(id, firstName, lastName, email, password, contact) {
        super(id, firstName, lastName, email, password, [Role.AUTHOR], contact);
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.contact = contact;
    }
    toString() {
        return `AUTHOR: ${super.toString()}`;
    }
}
export class Admin extends UserBase {
    constructor(id, firstName, lastName, email, password, contact) {
        super(id, firstName, lastName, email, password, [Role.ADMIN], contact);
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.contact = contact;
    }
    toString() {
        return `ADMIN: ${super.toString()}`;
    }
}
//# sourceMappingURL=user.js.map