export var Role;
(function (Role) {
    Role[Role["Author"] = 1] = "Author";
    Role[Role["Reader"] = 2] = "Reader";
    Role[Role["Admin"] = 3] = "Admin";
})(Role || (Role = {}));
export class PersonImpl {
    constructor(id, firstName, lastName, email, contact) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.contact = contact;
    }
    get salutation() {
        return `Hello Person: ${this.firstName} ${this.firstName} [${this.email}]`;
    }
}
export class UserDto {
    constructor(firstName, lastName, email, password, contact, roles = [Role.Reader]) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.contact = contact;
        this.roles = roles;
    }
    get salutation() {
        var _a;
        return `Hi ${this.firstName} ${this.firstName} [${this.email}] form ${(_a = this.contact) === null || _a === void 0 ? void 0 : _a.country} in roles: ${this.roles.map(r => Role[r]).join(', ')}`;
    }
}
export class UserImpl extends UserDto {
    constructor(id, firstName, lastName, email, password, contact, roles = [Role.Reader]) {
        super(firstName, lastName, email, password, contact, roles);
        this.id = id;
    }
}
//# sourceMappingURL=users.js.map