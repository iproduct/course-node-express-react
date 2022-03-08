function foo(x, y){
    console.log(x, y)
    for(arg of arguments) {
        console.log(arg)
    }
    // var arr = Array.prototype.slice.apply(arguments);
    var arr = Array.from(arguments);
    var sum = arr.reduce(function(acc, elem){ return acc + elem });
    console.log(sum);
}

foo(1,2,3,4,5,6,7)
