function f(a, b) {
    a = a || 5;
    b = b || 10;
    return a + b;
}

function f2(a = 5, b = 10) {
    return a + b;
}

console.log(f())
console.log(f2())