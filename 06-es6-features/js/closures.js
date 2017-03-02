function init() {
    var count = (function() {
        var count = 0;
        return function() {
            return count ++;
        }
    }());
    print((count()));
    print((count()));
    print((count()));
//    console.log(count());
//    console.log(count());
//    console.log(count());
}

