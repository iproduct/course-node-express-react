var counter = function countWithClosure() { //IIFE - Module pattern
  var count = 0; //private state
  const callbacks = []
  function _inc() { // private method
    return count++;
  }
  return { //public API
    increment: function () {
      _inc()
      for (let c of callbacks) {
        c(count)
      }
      return count;

    },
    decrement: function () {
      --count
      for (let c of callbacks) {
        c(count)
      }
      return count;
    },
    register_on_change: (callback) => {
      callbacks.push(callback)
    } 
  };
}(); // IIFE

function callbackFacktory(message) {
  return newVal => console.log(message , newVal)
}

counter.register_on_change(callbackFacktory('In callback'))
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