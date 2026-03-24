import { greeter } from "../greeter.js";
import { Role, UserDto } from "../users.js";
const contentElem = document.getElementById('content');
const i = 1;
const trayan = new UserDto(1, 'Trayan', 'Iliev', 'trayan@gmail.com', 'trayan123', [Role.Reader, Role.Author, Role.Admin]);
if (contentElem) {
    contentElem.innerHTML = greeter(trayan.salutation);
}
//# sourceMappingURL=index.js.map