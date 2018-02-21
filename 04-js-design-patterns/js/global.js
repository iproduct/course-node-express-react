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



