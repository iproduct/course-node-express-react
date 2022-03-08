/* 
 * Inheritance demo with Object.create()
 */
'use strict';

function Shape(/*Number*/ xCoord, /*Number*/ yCoord) {
    this.x = xCoord || 0;
    this.y = yCoord || 0;
}

Shape.prototype.move = function (/*Number*/ deltaX, /*Number*/ deltaY) {
    this.x += deltaX;
    this.y += deltaY;
    console.info("Shape moved.");
}


/* Rectangle extends Shape */
function Rectangle(/*Number*/ xCoord, /*Number*/ yCoord) {
    const boundShape = Shape.bind(this);
    boundShape(xCoord, yCoord);
}

//subclass extends superclass
Rectangle.prototype = Object.create(Shape.prototype);
Rectangle.prototype.constructor = Rectangle;

console.log("!!!" + Rectangle.prototype.__proto__.constructor);

var rect = new Rectangle(5, 8);

console.log("is Rectangle = ", rect instanceof Rectangle);
console.log("is Shape = ", rect instanceof Shape);

console.log("Before move: x = ", rect.x, "y = ", rect.y);
rect.move(1, 1);
console.log("After move: x = ", rect.x, "y = ", rect.y);