import { NaturalPerson } from "./person.js";
export var Role;
(function (Role) {
    Role[Role["Reader"] = 1] = "Reader";
    Role[Role["Author"] = 2] = "Author";
    Role[Role["Admin"] = 3] = "Admin";
})(Role || (Role = {}));
export class UserBase extends NaturalPerson {
    constructor(id, username, password, roles, firstName, lastName, email, contact) {
        super(id, firstName, lastName, email, contact);
        this.id = id;
        this.username = username;
        this.password = password;
        this.roles = roles;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.contact = contact;
    }
    get greeting() {
        return `User: ${this.username} [${super.greeting}] in roles: [${this.roles.map(r => Role[r]).join(', ')}]`;
    }
}
//# sourceMappingURL=users.js.map