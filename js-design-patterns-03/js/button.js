function Button(canvas, x, y, label, onclick) {
    this.canvas = canvas;
    this.context = this.canvas.getContext("2d");
    this.x = x;
    this.y = y;
    this.label = label;
    this.onclick = onclick;
    this.canvas.onmousedown = Button.prototype.checkMouseDown.bind(this);
    this.canvas.onmouseup = Button.prototype.checkMouseUp.bind(this);
    this.canvas.onmousemove = Button.prototype.checkMouseMove.bind(this);
    this.width = 100;
    this.height = 22;
    this.state = "up";
    this.borderColor = "#999999";
    this.upColor = "#dddddd";
    this.overColor = "#ff0000";
    this.downColor = "#aaaaaa";
    this.draw();
}
 
Button.prototype.draw = function() {
    // draw border
    this.context.fillStyle = this.borderColor;
    this.context.fillRect(this.x, this.y, this.width, this.height);
 
    // draw face
    if(this.state == "over") {
        this.context.fillStyle = this.overColor;
    }
    else if(this.state == "down") {
        this.context.fillStyle = this.downColor;
    }
    else {
        this.context.fillStyle = this.upColor;
    }
    this.context.fillRect(this.x + 1, this.y + 1, this.width - 2, 
        this.height - 2);
 
    // draw label
    this.context.font = "12px Arial";
    this.context.fillStyle = "#000000";
    this.context.fillText(this.label, this.x + 
   (this.width - this.context.measureText(this.label).width) / 2, 
        this.y + (this.height + 9) / 2);
};
 
Button.prototype.checkMouseDown = function(event) {
    var x = event.offsetX;
    var y = event.offsetY;
    if(x > this.x && x < this.x + this.width &&
       y > this.y && y < this.y + this.height) {
        this.state = "down";
    }
    else {
        this.state = "up";
    }
    this.draw();
};
 
Button.prototype.checkMouseUp = function(event) {
    var x = event.offsetX;
    var y = event.offsetY;
    if(x > this.x && x < this.x + this.width &&
       y > this.y && y < this.y + this.height) {
        this.state = "over";
        if(this.onclick != null) {
            this.onclick();
        }
    }
    else {
        this.state = "up";
    }
    this.draw();
};
 
Button.prototype.checkMouseMove = function(event) {
    var x = event.offsetX;
    var y = event.offsetY;
    if(x > this.x && x < this.x + this.width &&
       y > this.y && y < this.y + this.height) {
        this.state = "over";
    }
    else {
        this.state = "up";
    }
    this.draw();
};