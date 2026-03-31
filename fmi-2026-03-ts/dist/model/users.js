export var Role;
(function (Role) {
    Role[Role["Reader"] = 1] = "Reader";
    Role[Role["Author"] = 2] = "Author";
    Role[Role["Admin"] = 3] = "Admin";
})(Role || (Role = {}));
export class UserDto {
    constructor(id, firstName, lastName, email, password, roles = [Role.Reader], contact) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.roles = roles;
        this.contact = contact;
    }
    get salutation() {
        return `${this.firstName} ${this.lastName} - ${this.email}, in Roles: [${this.roles.map(r => Role[r]).join(', ')}]`;
    }
}
//# sourceMappingURL=users.js.map