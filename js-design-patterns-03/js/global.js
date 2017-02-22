function extend(Child, Parent) {
    Child.prototype = new Parent;
    Child.prototype.constructor = Child;
    Child.prototype.supper = Parent.prototype;
}

if(typeof Object.create !== 'function') {
    Object.create = function (o) {
        var F = function() {};
        F.prototype = o;
        return new F();
    };
}

if(typeof Object.clone !== 'function') {
    Object.clone = function (o, props, methods) {
        var props = props || {};
        var methods = methods || {};
        var F = function() {};
        var x, newObj;
        F.prototype = o;
        newObj = new F();
        for(x in props){
            newObj[x] = props[x];
        }
        for(x in methods){
            if(typeof methods[x] === 'function'){
                newObj[x] = methods[x];
            }
        }
        return newObj;
    };
}

Function.prototype.method = function(name, func) {
   // if(!this.prototype[name]) {
        this.prototype[name] = func;
    //}
    return this;
};

Function.method("inherits", 
    function(Parent) {
        this.prototype = new Parent();
        return this;
    }
    );
    
Function.method('new1', function(){
    var that = Object.create(this.prototype);
    var other = this.apply(that, arguments);
    return (typeof other === 'object' && other) || that;
}); 




