var counter = function countWithClosure() { //IIFE - Module pattern
  var count = 0; //private state
  function _inc() { // private method
    return count++;
  }
  return { //public API
    increment: function () {
      return _inc();
    },
    decrement: function () {
      return --count;
    }
  };
}();

console.log(counter.increment());
console.log(counter._inc)
console.log(counter.increment());
console.log(counter.increment());
console.log(counter.increment());
console.log(counter.decrement());
console.log(counter.decrement());
console.log(counter.decrement());
console.log(counter.decrement());
       
for (const prop in counter) {
  // if (obj.hasOwnProperty(prop)) {
      console.log(`counter.${prop} = ${counter[prop]}`);
  // }
}