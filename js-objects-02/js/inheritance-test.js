/* 
 * Basic object inheritance demo
 */

function test() {

    function Foo(/*Number*/ initValue) {
        this.x = initValue || 0;
    }
    Foo.prototype.addX = function(/*Number*/ y) {
        this.x += y;
    }

    function Bar(/*Number*/ initValue, /*Number*/ increment) {
        this.supper.constructor.call(this, initValue);
        this.inc = increment;
        this.increment = function() {
            this.addX(this.inc);
        }
    }

    function extend(Child, Parent) {
        Child.prototype = new Parent();
        Child.prototype.constructor = Child;
        Child.prototype.supper = Parent.prototype;
    }

    extend(Bar, Foo);

//    Bar.prototype.increment = function(){
//        this.addX(this.inc);
//    }

    obj = new Bar(20, 30);
    obj.increment();
    console.log("x = ", obj['x']);

    for (p in obj) {
        if (obj.hasOwnProperty(p) && typeof obj[p] !== "function") {
            console.log(p + ": " + obj[p]);
        }
    }
}
