'use strict';

// Shapes module to be used by cadsystem.js and cadsystem-demo.js to create shapes
var shapes = (function () {
    function Shape(sx, sy, width, height, strokeColor, fillColor) {
        this.x = sx || 0;
        this.y = sy || 0;
        this.strokeColor = strokeColor || "#000000";
        this.fillColor = fillColor || "#ff0000";
        this.width = width || 0;
        this.height = height || 0;
    }

    // Extending Eventable class from events.js to anable processing of custom events
    // 'extend' utility function is defined in global.js
    extend(Shape, Eventable);

    Shape.prototype.toString = function () {
        return "x: " + this.x + ", y: " + this.y +
            ", strokeColor: " + this.strokeColor +
            ", fillColor: " + this.fillColor;
    };
    Shape.prototype.translate = function (dx, dy) {
        this.x += dx;
        this.y += dy;
        if (this.fire) {
            this.fire({ type: 'translate', payload: this.toString() });
        }
        return this;
    };
    Shape.prototype.draw = function (ctx) {
        console.log("Shape draw() method is abstract");
        return this;
    };
    Shape.prototype.getArea = function () {
        return undefined;
    };
    Shape.prototype.getPerimeter = function () {
        return undefined; //throw exception
    };


    // Point
    function Point(x, y, color) {
        Shape.apply(this, [x, y, 1, 1, color, color]);
    }
    extend(Point, Shape);
    Point.prototype.toString = function () {
        return "Point(" + this.supper.toString.apply(this, []) + ")";
    };
    Point.prototype.draw = function (ctx) {
        ctx.Style = this.strokeColor;
        ctx.fillRect(this.x, this.y, 1, 1);
    };


    // Line
    function Line(x1, y1, x2, y2, color) {
        Shape.apply(this, [(x1 + x2) / 2, (y1 + y2) / 2, x2 - x1, y2 - y1, color, color]);
    }
    extend(Line, Shape);
    Line.prototype.toString = function () {
        return "Line(x1: " + (this.x - this.width / 2)
            + ", y1: " + (this.y - this.height / 2)
            + ", x2: " + (this.x + this.width / 2)
            + ", y2: " + (this.y + this.height / 2)
            + ", color: " + this.strokeColor + ")";
    };
    Line.prototype.draw = function (ctx) {
        ctx.strokeStyle = this.strokeColor;
        ctx.beginPath();
        ctx.moveTo(this.x - this.width / 2, this.y - this.height / 2);
        ctx.lineTo(this.x + this.width / 2, this.y + this.height / 2);
        ctx.stroke();
    };


    // Circle
    function Circle(cx, cy, r, strokeColor, fillColor) {
        r = r || 50;
        Shape.apply(this, [cx, cy, 2 * r, 2 * r, strokeColor, fillColor]);
        this.radius = r;
        //this.perimeter = 2 * Math.PI * r;
        //this.area = Math.PI * r * r / 2;
    }
    Circle.prototype = new Shape();
    Circle.prototype.constructor = Shape;
    Circle.prototype.toString = function () {
        return this.__proto__.__proto__.toString.apply(this, arguments)
            + ", radius: " + this.radius;
    };
    Circle.prototype.draw = function (ctx) {
        ctx.fillStyle = this.fillColor;
        ctx.strokeStyle = this.strokeColor;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
        ctx.fill();
        ctx.stroke();
        return this;
    };
    Circle.prototype.getPerimeter = function () {
        return 2 * Math.PI * this.radius;
    };
    Circle.prototype.getArea = function () {
        return Math.PI * this.radius * this.radius / 2;
    };


    // Rectangle
    function Rectangle(x, y, width, height, strokeColor, fillColor) {
        Shape.apply(this, [x, y, width, height, strokeColor, fillColor]);
    }
    Rectangle.prototype = new Shape();
    Rectangle.prototype.constructor = Shape;
    Rectangle.prototype.getArea = function () {
        return this.width * this.height;
    };
    Rectangle.prototype.getPerimeter = function () {
        return 2 * (this.width + this.height);
    };
    Rectangle.prototype.toString = function () {
        return "x: " + this.x + ", y: " + this.y
            + ", width: " + this.width + ", height: " + this.height;
    };
    Rectangle.prototype.draw = function (ctx) {
        ctx.fillStyle = this.fillColor;
        ctx.fillRect(this.x - this.width / 2, this.y - this.height / 2,
            this.width, this.height);
        ctx.shadowColor = "rgba(0,0,0,0)";
        ctx.strokeStyle = this.strokeColor;
        ctx.strokeRect(this.x - this.width / 2, this.y - this.height / 2,
            this.width, this.height);
    };


    // Polygon
    function Polygon(x, y, points, strokeColor, fillColor) {
        this.points = points || [];
        this.base = Shape;
        this.base();
        this.x = x || 0;
        this.y = y || 0;
    }
    Polygon.prototype.draw = function (ctx) {
        var i;
        if (this.points.length > 0) {
            ctx.fillStyle = this.fillColor;
            ctx.strokeStyle = this.strokeColor;
            ctx.beginPath();
            ctx.moveTo(this.points[0].x + this.x, this.points[0].y + this.y);
            for (i = 0; i < this.points.length; i++) {
                ctx.lineTo(this.points[i].x + this.x, this.points[i].y + this.y);
            }
            ctx.fill();
            ctx.stroke();
        }
        return this;
    };
    Polygon.prototype.toString = function () {
        return "x: " + this.x + ", y: " + this.y + ", nPoints: "
            + this.points.length;
    };

    // Button interactive component
    function Button(canvas, x, y, width, height, label, onclick) {
        this.canvas = canvas;
        this.context = this.canvas.getContext("2d");
        this.label = label;
        this.onclick = onclick;
        this.canvas.onmousedown = Button.prototype.checkMouseDown.bind(this);
        this.canvas.onmouseup = Button.prototype.checkMouseUp.bind(this);
        this.canvas.onmousemove = Button.prototype.checkMouseMove.bind(this);
        this.state = "up";
        this.borderColor = "#999999";
        this.upColor = "#dddddd";
        this.overColor = "#ff0000";
        this.downColor = "#aaaaaa";
        Rectangle.call(this, x, y, width, height, this.borderColor, this.upColor);
    }

    extend(Button, Rectangle);

    Button.prototype.draw = function (ctx) {
        if (this.state == "over") {
            this.fillColor = this.overColor;
        }
        else if (this.state == "down") {
            this.fillColor = this.downColor;
        }
        else {
            this.fillColor = this.upColor;
        }
        // call Rectangle draw() method
        this.supper.draw.call(this, this.context);

        // draw label
        this.context.font = "12px Arial";
        this.context.fillStyle = "#000000";
        var textSize = this.context.measureText(this.label)
        this.context.fillText(this.label, 
            this.x - textSize.width / 2,
            this.y + 6);
    };

    Button.prototype.checkMouseDown = function (event) {
        if (this.isInside(event)) {
            this.state = "down";
        }
        else {
            this.state = "up";
        }
        this.draw(this.context);
    };

    Button.prototype.checkMouseUp = function (event) {
        if (this.isInside(event)) {
            this.state = "over";
            if (this.onclick != null) {
                this.onclick();
            }
        }
        else {
            this.state = "up";
        }
        this.draw(this.context);
    };

    Button.prototype.checkMouseMove = function (event) {
        if (this.isInside(event)) {
            this.state = "over";
        }
        else {
            this.state = "up";
        }
        this.draw();
    };

    Button.prototype.isInside = function(event) {
        var x = event.offsetX;
        var y = event.offsetY;
        return x > this.x - this.width/2 && x < this.x + this.width/2 &&
            y > this.y - this.height/2 && y < this.y + this.height/2;
    };

    return {
        makePoint: function (x, y, color) {
            return new Point(x, y, color);
        },
        makeLine: function (x1, y1, x2, y2, color) {
            return new Line(x1, y1, x2, y2, color);
        },
        makeCircle: function (cx, cy, r, strokeColor, fillColor) {
            return new Circle(cx, cy, r, strokeColor, fillColor);
        },
        makeRectangle: function (x, y, width, height, strokeColor, fillColor) {
            return new Rectangle(x, y, width, height, strokeColor, fillColor);
        },
        makePolygon: function (x, y, points, width, height, strokeColor,
            fillColor) {
            return new Polygon(x, y, points, width, height, strokeColor, fillColor);
        },
        makeButton: function (canvas, x, y, width, height, label, onclick) {
            return new Button(canvas, x, y, width, height, label, onclick);
        },

    };
})();

