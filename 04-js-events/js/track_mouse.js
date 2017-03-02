/* 
 * Canvas event tracking demo.
 */

function init() {
    var x, y;
    var isDown = false;
    var text;
    var textXPos;

    var canvas = document.getElementById('canvas');
    if (canvas !== null && canvas.getContext) {
        var ctx = canvas.getContext('2d');
    } else {
        alert("Problem creating canvas 2D drawing context.");
        return;
    }

    x = canvas.width / 2;
    y = canvas.height / 2;
    ctx.font = "18pt Arial";
    text = "x: " + x + ", y: " + y + ", state: " + (isDown ? "down" : "up");
    textXPos = (canvas.width - ctx.measureText(text).width) / 2; //calculate text X position

    canvas.addEventListener("mousedown", setMouseDown, false);
    canvas.addEventListener("mousemove", updateMousePosition, false);
    canvas.addEventListener("mouseup", setMouseUp, false);
    canvas.addEventListener("touchstart", touchDown, false);
    canvas.addEventListener("touchend", touchUp, false);
    canvas.addEventListener("touchcancel", touchUp, false);
    canvas.addEventListener("touchmove", updateTouchPosition, false);

    function setMouseUp(e) {
        isDown = false;
        updateMousePosition(e);
    }
    function setMouseDown(e) {
        isDown = true;
        updateMousePosition(e);
    }
    function updateMousePosition(e) {
        if (!e)
            var e = window.event;
        x = e.pageX - canvas.offsetLeft;
        y = e.pageY - canvas.offsetTop;
        drawStatePosition();
    }
    function touchUp(e) {
        isDown = 0;
        updateTouchPosition(e);
    }
    function touchDown(e) {
        isDown = 1;
        updateTouchPosition(e);
    }
    function updateTouchPosition(e) {
        if (!e)
            var e = window.event;
        e.preventDefault();
        x = e.targetTouches[0].pageX - canvas.offsetLeft;
        y = e.targetTouches[0].pageY - canvas.offsetTop;
        drawStatePosition();
    }

    function drawStatePosition() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "green";
        var str = "x: " + x + ", y: " + y + ", state: " + (isDown ? "down" : "up");
        ctx.fillText(str, textXPos, canvas.height / 2);
        ctx.fillStyle = "red";
        ctx.fillRect(x - 20, y - 20, 40, 40);
        ctx.clearRect(x - 10, y - 10, 20, 20);
        ctx.strokeRect(x - 5, y - 5, 10, 10);
    }
}


