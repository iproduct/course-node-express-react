import { greeter } from "./greeter.js";

const user = 'Georgi';
const contentElem = document.getElementById('content');
if (contentElem) {
    contentElem.innerHTML = greeter(user);
}