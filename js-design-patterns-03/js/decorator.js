function ConcreteClass(){
    this.performTask = function()
    {	
        console.log('doing something');
    };
}

function AbstractDecorator(decorated){
    this.performTask = function()
    {
        this.preTask();
        decorated.performTask();
        this.postTask();
    };
}

function ConcreteDecoratorClass(decorated){
    this.base = AbstractDecorator;
    this.base(decorated);
	
    this.preTask = function()
    {
        console.log('Decorator1 pre-calling..');
    };
	
    this.postTask = function()
    {
        console.log('Decorator1 post-calling..');
    };
	
}
function ConcreteDecoratorClass2(decorated){
    this.base = AbstractDecorator;
    this.base(decorated);
	
    this.preTask = function()
    {
        console.log('Decorator2 pre-calling..');
    };
	
    this.postTask = function()
    {
        console.log('Decorator2 post-calling..');
    };
	
}

var concrete = new ConcreteClass();
var decorator1 = new ConcreteDecoratorClass(concrete);
var decorator2 = new ConcreteDecoratorClass2(decorator1);
decorator2.performTask();
