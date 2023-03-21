import { UserBase, Role } from './user.js';
function greeter(user) {
    return user.toString();
    // return `Hello ${user.firstName} ${user.lastName} from ${user.contact?.country || 'BG'} in Roles: 
    // ${user.roles.map(role => Role[role]).join(', ')}`;
}
const user1 = new UserBase(1, 'Trayan', 'Iliev', 'trayan@gmail.com', 'trayan123', [Role.AUTHOR, Role.ADMIN], { country: 'BG', address: 'Sofia, 1000' });
document.getElementById('results').innerHTML = greeter(user1);
//# sourceMappingURL=greeter%20copy.js.map