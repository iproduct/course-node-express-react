'use strict';

var counter = (function () {
  var count = 0;
  function inc() {
      return ++ count;
  };
  function dec() {
    return -- count;
  }
  return {
    increment: inc,
    decrement: dec
  }
}) (); //IIFE, Module design pattern

console.log(counter.increment());
console.log(counter.increment());
console.log(counter.decrement());
console.log(counter.decrement());

console.log(counter.count); //undefined - private