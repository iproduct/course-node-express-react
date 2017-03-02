function init() {
    var canvas = document.getElementById('canvas');
    var button;
    if (canvas !== null && canvas.getContext) {
        var ctx = canvas.getContext('2d');
        loadDynamic('js', ['global.js', 'events.js'], function () {
            loadDynamic('js', ['shapes.js'], function () {
                loadDynamic('js', ['cadsystem.js', 'shape_decorators.js'], function () {
                    setupScene(ctx);
                });
            });
        });
    } else {
        alert("Problem creating canvas 2D drawing context");
    }

    function setupScene(ctx) {
        // Initialize the CADSystem module with drawing canvas context
        CADSystem.setDrawingContext(ctx)

        // Make some shapes
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

        var l2 = shapes.makeLine(300, 20, 220, 250, "orange");
        console.log(l2.toString());

        l1.draw(ctx);
        l2.draw(ctx);

        // ... and decorate them
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

        // ... and decorate them even more
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

        // try event handling
        r1.on("translate", function (e) {
            alert('Object translated: ' + e.payload);
        });
        setTimeout(function() {r1.translate(-100, 100);}, 2000);
        

        // Canvas custom button component demo - see button.js
        button = shapes.makeButton(canvas, 240, 280, 140, 30, "Start Animation Demo", function () { startAnimation(ctx); });
        button.draw(ctx);

        function startAnimation(ctx) {
            CADSystem.draw().addShape(button)
                .delay(2000).addShape(l2).draw()
                .delay(2000).addShape(r1_decorated).draw()
                .delay(2000).addShape(c1_decorated).draw()
                .delay(1000).addShape(l1).draw()
                .drawBoundingRectangle()
                .delay(2000).removeShape(l1).draw()
                .delay(1500).removeShape(l2).draw()
                .delay(2000).removeShape(c1_decorated).draw()
                .delay(1500).removeShape(r1_decorated).draw();
        }
    }


}