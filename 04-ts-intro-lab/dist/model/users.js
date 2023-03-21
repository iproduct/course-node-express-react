export var Role2;
(function (Role2) {
    Role2[Role2["AUTHOR"] = 1] = "AUTHOR";
    Role2[Role2["READER"] = 2] = "READER";
    Role2[Role2["ADMIN"] = 3] = "ADMIN";
})(Role2 || (Role2 = {}));
export class UserBase {
    constructor(nameOrUser, lastName, email, password, contact) {
        this.id = undefined;
        this.role = 'READER'; // disciminator property
        if (typeof nameOrUser === 'string') {
            this.firstName = nameOrUser;
            this.lastName = lastName || '';
            this.email = email || '';
            this.password = password || '';
            this.contact = contact;
        }
        else {
            this.id = nameOrUser.id;
            this.firstName = nameOrUser.firstName;
            this.lastName = nameOrUser.lastName;
            this.email = nameOrUser.email;
            this.password = nameOrUser.password;
            this.role = nameOrUser.role;
            this.contact = nameOrUser.contact;
        }
    }
    get salutation() {
        return `Hello ${this.firstName} ${this.lastName} in role: ${this.role}`;
    }
    toString() {
        return `ID: ${this.id}, Name: ${this.firstName} ${this.lastName}, Email: ${this.email}, Pasword: ${this.password}, Roles: role: ${this.role}`;
    }
}
export class Anonymous extends UserBase {
    constructor(firstName, lastName, email, password, sessionTime, contact) {
        super(firstName, lastName, email, password, contact);
        this.sessionTime = sessionTime;
        this.role = 'ANONYMOUS';
    }
    toString() {
        return `READER: ${super.toString()}`;
    }
}
export class Reader extends UserBase {
    constructor(firstName, lastName, email, password, favouritePosts, contact) {
        super(firstName, lastName, email, password, contact);
        this.favouritePosts = favouritePosts;
        this.role = 'READER';
    }
    toString() {
        return `READER: ${super.toString()}`;
    }
}
export class Author extends UserBase {
    constructor(firstName, lastName, email, password, ownPosts, contact) {
        super(firstName, lastName, email, password, contact);
        this.ownPosts = ownPosts;
        this.role = 'AUTHOR';
    }
    toString() {
        return `AUTHOR: ${super.toString()}`;
    }
}
export class Admin extends UserBase {
    constructor(firstName, lastName, email, password, managedUsers, contact) {
        super(firstName, lastName, email, password, contact);
        this.managedUsers = managedUsers;
        this.role = 'ADMIN';
    }
    toString() {
        return `ADMIN: ${super.toString()}`;
    }
}
// export function getExtraData(user: UserType) {
//     let extraData: string;
//     if(user instanceof Reader) {
//         extraData = user.favouritePosts.toString();
//     } else if(user instanceof Author){
//         extraData = user.ownPosts.toString();
//     } else if(user instanceof Admin){
//         extraData = user.managedUsers.toString();
//     } else {
//         throw new Error('Should not come here');
//     }
//     return extraData;
// }
export function getExtraData(user) {
    switch (user.role) {
        case 'READER':
            return user.favouritePosts.toString();
        case 'AUTHOR':
            return user.ownPosts.toString();
        case 'ADMIN':
            return user.managedUsers.toString();
        case 'ANONYMOUS':
            return user.sessionTime.toString();
        default:
            const _exhaustiveCheck = user;
            return _exhaustiveCheck;
    }
}
//# sourceMappingURL=users.js.map