var counter = (function countWithClosure() { //IIFE - Module pattern
  var count = 0; //private state
  return { //public API
    increment: function () {
      return ++count;
    },
    decrement: function () {
      return --count;
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
       