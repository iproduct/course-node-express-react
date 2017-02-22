function init() {
    var canvas = document.getElementById('canvas');
    var button;
    if (canvas !== null && canvas.getContext) {
        var ctx = canvas.getContext('2d');
        loadDynamic('js', ['global.js', 'events.js'], function () {
            loadDynamic('js', ['button.js', 'shapes.js', 'shape_decorators.js'], function () {
                button = new Button(canvas, 200, 270, "Start Demo", function() { start(ctx); });
            })
        });
    } else {
        alert("Problem creating canvas 2D drawing context");
    }
}

function start(ctx) {

    var p1 = shapes.makePoint(2, 3);
    var p2 = shapes.makePoint(30, 90);
    p2.draw(ctx);
    var p3 = shapes.makePoint(40, 50, "green");
    p3.draw(ctx);
    console.log(p1.translate(10, 10).toString());
    console.log(p2.translate(10, 10).toString());
    console.log(p3.translate(10, 10).toString());

    var l1 = shapes.makeLine(200, 20, 220, 250, "green");
    console.log(l1.translate(-10, -10).toString());

    //var l2 = Object.create(l1);

    var l2 = Object.clone(l1, {
        x: 300,
        strokeColor: 'orange'
    },

        {
            toString: function () {
                return "New Line(" + this.x + ", " + this.y + ", "
                    + this.strokeColor + ")";
            }
        });

    // l2.x = 300;
    // l2.strokeColor = 'blue';
    console.log(l2.toString());
    console.log(l1.toString());

    l1.draw(ctx);
    l2.draw(ctx);


    var c1 = shapes.makeCircle(100, 100, 70);
    var c1_decorated = new AreaShapeDecorator(
        new NamedShapeDecorator(c1, "Circle 1", null, "15px Arial"));
    c1_decorated.draw(ctx);
    console.log("c1: " + c1.toString());

    var po1 = shapes.makePolygon(200, 100, [p1, p2, p3]);
    console.log(po1.toString());
    po1.draw(ctx);

    var r1 = shapes.makeRectangle(300, 100, 150, 80, "red", "orange");
    console.log("r1 = " + r1.toString() + ", Area = " + r1.getArea());
    r1.draw(ctx);

    var r1_decorated =
        new AreaShapeDecorator(
             new ShadowShapeDecorator(
                 new NamedShapeDecorator(
                    r1, "Rectangle 1", null, "15px Arial"
                )
                , 15, 15, 7, "brown"
             )
        );

    r1_decorated.draw(ctx);
    r1.on("translate", function (e) {
        alert('Object translated: ' + e.payload);
    });
    r1.translate(-100, 100);


    /**
     *  CADSystem module
     */

    CADSystem = (function () {
        var shapes = [];
        var context;

        /* Private methods */
        function minX() {
            var x, min = Number.POSITIVE_INFINITY;
            for (i = 0; i < shapes.length; i++) {
                x = shapes[i].x;
                if (x < min) {
                    min = x;
                }
            }
            return min;
        }
        function minY() {
            var y, min = Number.POSITIVE_INFINITY;
            for (i = 0; i < shapes.length; i++) {
                y = shapes[i].y - shapes[i].height / 2;
                if (y < min) {
                    min = y;
                }
            }
            return min;
        }
        function minX() {
            var x, min = Number.POSITIVE_INFINITY;
            for (i = 0; i < shapes.length; i++) {
                x = shapes[i].x - shapes[i].width / 2;
                if (x < min) {
                    min = x;
                }
            }
            return min;
        }
        function maxY() {
            var y, max = Number.NEGATIVE_INFINITY;
            for (i = 0; i < shapes.length; i++) {
                y = shapes[i].y + shapes[i].height / 2;
                if (y > max) {
                    max = y;
                }
            }
            return max;
        }
        function maxX() {
            var x, max = Number.NEGATIVE_INFINITY;
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
            shapes.push(shape);
            return this;
        }
        function removeShape(index) {
            shapes.splice(index, 1);
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
                    } (i);
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


    CADSystem.setDrawingContext(ctx)
        .draw().delay(2000).addShape(l2).draw()
        .delay(2000).addShape(r1_decorated).draw()
        .delay(2000).addShape(c1_decorated).draw()
        .delay(1000).addShape(l1).draw()
        .drawBoundingRectangle()
        .delay(2000).removeShape(3).draw()
        .delay(1500).removeShape(0).draw()
        .delay(2000).removeShape(2).draw()
        .delay(1500).removeShape(1).draw();

}