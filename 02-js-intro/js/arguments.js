function sum(x, y){
    console.log(x, y)
    for(let arg of arguments) {
        console.log(arg)
    }
    // var arr = Array.prototype.slice.apply(arguments); // <=> arguments.slice()
    // var arr = Array.prototype.slice.call(arguments);
    var arr = Array.prototype.slice.bind(arguments)();
    // var arr = Array.from(arguments);
    // var arr = [...arguments];
    var sum = arr.reduce(function(acc, elem){ return acc + elem }, '');
    // let sum = 0;
    // arr.forEach(function(elem, index, arr){ return sum +=elem });
    return sum;
}

console.log("sum =", sum(1,2,3,4,5,6,7,8,9,10));
