export function myComponent() {
    var element = document.createElement('h1');

    element.className = 'btn btn-primary';
    element.innerHTML = 'Hello ECMAScript 6 World!';

    return element;
};

export class MyComponent {
    constructor(title) {
        this.title = title;
    }
    getElement() {
        var element = document.createElement('h1');

        element.className = 'btn btn-primary';
        element.innerHTML = this.title;

        return element;
    }
}