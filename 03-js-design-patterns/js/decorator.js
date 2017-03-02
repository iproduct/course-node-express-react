function ClassToBeDecorated(){
    this.doSomething = function()
    {	
        console.log('doing something');
    };
}

function AbstractDecorator(decorated){
    this.doSomething = function()
    {
        this.preExtension(); //abstract method to be defined by successors
        decorated.doSomething();
        this.postExtension(); //abstract method to be defined by successors
    };
}

// Concrete Decorators
function FirstDecorator(decorated){
    this.base = AbstractDecorator;
    this.base(decorated);
	
    this.preExtension = function()
    {
        console.log('First Decorator Pre Extension ...');
    };
	
    this.postExtension = function()
    {
        console.log('First Decorator Post Extension ...');
    };
	
}

function SecondDecorator(decorated){
    this.base = AbstractDecorator;
    this.base(decorated);
	
    this.preExtension = function()
    {
        console.log('Second Decorator Pre Extension ...');
    };
	
    this.postExtension = function()
    {
        console.log('Second Decorator Post Extension ...');
    };
	
}

var decorated = new ClassToBeDecorated();
var firstDecorator = new FirstDecorator(decorated);
var secondDecorator = new SecondDecorator(firstDecorator);
secondDecorator.doSomething();
