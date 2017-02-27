'use strict';

var counter = function () {
  var counter = 0; //private
  function inc() {
    return ++counter;
  }
  function dec() {
    return --counter;
  }

  return { //public
    increment: inc,
    decrement: dec
  }
}(); //IIFE, Module design pattern

console.log(counter.increment());
console.log(counter.increment());
console.log(counter.decrement());
console.log(counter.decrement());

