var counter = (function countWithClosure() { //IIFE - Module pattern
  var count = 0; //private state
  function inc(val) { //private method
    count += val;
    return count;
  }
  return { //public API
    increment: function () {
      return inc(1);
    },
    decrement: function () {
      return inc(-1);
    }
  };
})();


console.log(counter.increment());
console.log(counter.increment());
console.log(counter.increment());
console.log(counter.increment());
console.log(counter.decrement());
console.log(counter.decrement());
console.log(counter.decrement());
console.log(counter.decrement());
       