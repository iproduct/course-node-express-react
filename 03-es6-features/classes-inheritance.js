class Shape {
    constructor(x, y, w, h, strokeColor, fillcolor) {
        this.x = x || 0;
        this.y = y || 0;
        this.w = w || 0;
        this.h = h || 0;
        this.strokeColor = strokeColor || 0;
        this.fillcolor = fillcolor || 0;
    }
    move(x, y) {
        this.x += x;
        this.y += y;
    }
    toString() {
        return `Shape(x: ${this.x}, y: ${this.y}, width: ${this.w}, height: ${this.h})`;
    }
}

class Point extends Shape {
    constructor(x, y, color) {
        super(x, y, 0, 0, color, color);
    }
    toString() {
        return 'Point: ' + super.toString();
    }
}

const p1 = new Point(2,6, 'ffffff');
console.log(p1.toString());
p1.move(5,5);
console.log(p1.toString());