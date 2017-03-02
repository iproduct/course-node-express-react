'use strict';

// CADSystem module to be used by cadsystem-demo.js
var CADSystem = (function () {
    var shapes = [];
    var context;

    /* Private methods */
    function minX() {
        var i, x, min = Number.POSITIVE_INFINITY;
        for (i = 0; i < shapes.length; i++) {
            x = shapes[i].x;
            if (x < min) {
                min = x;
            }
        }
        return min;
    }
    function minY() {
        var i, y, min = Number.POSITIVE_INFINITY;
        for (i = 0; i < shapes.length; i++) {
            y = shapes[i].y - shapes[i].height / 2;
            if (y < min) {
                min = y;
            }
        }
        return min;
    }
    function minX() {
        var i, x, min = Number.POSITIVE_INFINITY;
        for (i = 0; i < shapes.length; i++) {
            x = shapes[i].x - shapes[i].width / 2;
            if (x < min) {
                min = x;
            }
        }
        return min;
    }
    function maxY() {
        var i, y, max = Number.NEGATIVE_INFINITY;
        for (i = 0; i < shapes.length; i++) {
            y = shapes[i].y + shapes[i].height / 2;
            if (y > max) {
                max = y;
            }
        }
        return max;
    }
    function maxX() {
        var i, x, max = Number.NEGATIVE_INFINITY;
        for (i = 0; i < shapes.length; i++) {
            x = shapes[i].x + shapes[i].width / 2;
            if (x > max) {
                max = x;
            }
        }
        return max;
    }

    /* Public methods */
    function addShape(shape) {
        if(shapes.indexOf(shape) < 0){
            shapes.push(shape);
        }
        return this;
    }
    function removeShape(shape) {
        var index = shapes.indexOf(shape);
        if(index >= 0) shapes.splice(index, 1);
        return this;
    }
    function getShape(index) {
        if (index >= 0 && index < shapes.length) {
            return shapes[index];
        } else {
            return null;
        }
    }
    function getShapesCount() {
        return shapes.length;
    }
    function draw(ctx) {
        ctx = ctx || context;
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        ctx.save();
        for (var i = 0; i < shapes.length; i++) {
            shapes[i].draw(ctx);
        }
        ctx.restore();
        return this;
    }
    function getBRect() {
        return {
            x: minX(),
            y: minY(),
            width: maxX() - minX(),
            height: maxY() - minY()
        };
    }
    function drawBRect(ctx) {
        ctx = ctx || context;
        var rect;
        rect = getBRect();
        ctx.save();
        ctx.fillStyle = "rgba(0,0, 255,0.4)";
        ctx.fillRect(rect.x, rect.y,
            rect.width, rect.height);
        ctx.restore();
        return this;
    }
    function delay(time) {
        var result = {}, i, that;
        for (i in this) {
            that = this;
            if (typeof that[i] === "function") {
                result[i] = function (x) {
                    return function () {
                        var args = Array.prototype.slice.call(arguments);
                        setTimeout(function () {
                            that[x].apply(result, args);
                        }, time);
                        return result;
                    };
                }(i);
            } else {
                result[i] = that[i];
            }
        }
        result.delay = this.delay;
        return result;
    }
    function echo(str) {
        console.log(str);
        return this;
    }
    function setDrawingContext(ctx) {
        context = ctx;
        return this;
    }
    return {
        addShape: addShape,
        removeShape: removeShape,
        getShape: getShape,
        getShapesCount: getShapesCount,
        draw: draw,
        getBoundingRectangle: getBRect,
        drawBoundingRectangle: drawBRect,
        delay: delay,
        echo: echo,
        setDrawingContext: setDrawingContext
    }
})();