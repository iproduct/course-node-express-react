function Circle() {}
Circle.prototype.toString = function() {
    return "Circle class[]"
}
const shape = {};
const circle = new Circle();

// Set the object prototype.
// DEPRECATED. This is for example purposes only. DO NOT DO THIS in real code.
shape.__proto__ = circle;

// Get the object prototype
console.log(circle.__proto__ === Circle.prototype); // false
console.log(circle instanceof Circle); // false
console.log(circle.toString()); // false