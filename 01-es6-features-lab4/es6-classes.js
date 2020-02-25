'use strict';

class Shape{
    constructor(x, y, w, h, strokeColor, fillColor) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.strokeColor = strokeColor || '#000000';
        this.fillColor = fillColor || '#ff0000';
    }

    move(dx, dy) {
        this.x += dx;
        this.y += dy;
    }
    toString() {
        return `${this.x}, ${this.y}, width: ${this.w}, height: ${this.h}`;
    }
}

class Point extends Shape {
    constructor(x, y, color) {
        super(x, y, 0, 0, color, color);
    }
    toString() {
        return `Point: ${super.toString()}, color: ${this.strokeColor}`;
    }
}

const pA = new Point(2,5, 'red');
console.log(pA);
pA.move(5,5);
console.log(pA);