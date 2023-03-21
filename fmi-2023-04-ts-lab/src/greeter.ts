function greet(name: string) {
    return `Hello ${name}, from TypeScript!`;
}

document.getElementById('demo')!.innerHTML = greet('Dimitar');
