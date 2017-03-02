function AbstracShapeDecorator(decorated){
    Object.defineProperty(this, "x", {
        get : function(){ return decorated.x; },
        set : function(newValue){ decorated.x = newValue; },
        enumerable : true,
        configurable : true
    });
    Object.defineProperty(this, "y", {get : function(){ return decorated.y; },
        set : function(newValue){ decorated.y = newValue; },
        enumerable : true,
        configurable : true});
    Object.defineProperty(this, "width", {get : function(){ return decorated.width; },
        set : function(newValue){ decorated.width = newValue; },
        enumerable : true,
        configurable : true});
    Object.defineProperty(this, "height", {get : function(){ return decorated.height; },
        set : function(newValue){ decorated.height = newValue; },
        enumerable : true,
        configurable : true});
    this.getArea = function () {return decorated.getArea();};
    this.getPerimeter = function () {return decorated.getPerimeter();};
    this.draw = function(ctx) {
        this.ctx = ctx;
        this.preTask();
        decorated.draw(ctx);
        this.postTask();
    };

}

function NamedShapeDecorator(decorated, name, color, font, dx, dy){
    this.base = AbstracShapeDecorator;
    this.base(decorated);
    this.name = name || "Anonymous";
    this.txtColor = color || decorated.txtColor || "#000000";
    this.font = font  || decorated.font || "18px Times New Roman";
    this.dx = dx || 0;
    this.dy = dy || 2;
    
    this.preTask = function()
    {
        this.ctx.save();
    };
	
    this.postTask = function()
    {
        var ctx = this.ctx;
        ctx.font = this.font;  
        ctx.fillStyle = this.txtColor;
        ctx.textAlign = "center";
        ctx.textBaseline="top";
        ctx.fillText(this.name, decorated.x + this.dx, decorated.y 
                + decorated.height/2 + this.dy); 
        ctx.restore();
    };
}

function AreaShapeDecorator(decorated, color, font, dx, dy){
    this.base = AbstracShapeDecorator;
    this.base(decorated);
    this.txtColor = color || decorated.txtColor || "#000000";
    this.font = font  || decorated.font || "18px Times New Roman";
    this.dx = dx || 0;
    this.dy = dy || 2;
    
    this.preTask = function()
    {
        this.ctx.save();
    };
	
    this.postTask = function()
    {
        var ctx = this.ctx, area;
        ctx.font = this.font;  
        ctx.fillStyle = this.txtColor;
        ctx.textAlign = "center";
        ctx.textBaseline="middle";
        area = Math.round(decorated.getArea()) || "undefined";
        ctx.fillText("Area = " + area, decorated.x + this.dx, 
            decorated.y + this.dy); 
        ctx.restore();
    };
}

function ShadowShapeDecorator(decorated, offsetX, offsetY, blur, color){
    this.base = AbstracShapeDecorator;
    this.base(decorated);
    this.offsetX = offsetX || 5;
    this.offsetY = offsetY || 5;
    this.blur = blur || 5;
    this.shadowColor = color || "rgba(0, 0, 0, 0.5)";  
    
    this.preTask = function()
    {
        ctx = this.ctx;
        ctx.save();
        ctx.shadowOffsetX = this.offsetX;
        ctx.shadowOffsetY = this.offsetY;
        ctx.shadowColor = this.shadowColor;
        ctx.shadowBlur= this.blur;
    };
	
    this.postTask = function()
    {
        ctx.restore();
    };
}

