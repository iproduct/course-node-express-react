'use strict';

var counter = function () {
  var count = 0; //private
  function inc() {
    return ++count;
  }
  function dec() {
    return --count;
  }

  return { //public
    increment: inc,
    decrement: dec
  }
}(); //IIFE, Design pattern Revealing Module

console.log(counter.increment());
console.log(counter.increment());
console.log(counter.increment());
console.log(counter.decrement());
console.log(counter.decrement());

console.log(counter.count);