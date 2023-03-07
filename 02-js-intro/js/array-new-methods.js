'use strict';
/* 
 * Test JS 1.6 new Array Methods
 */

var array = [3, 5, 7, 2, 7, 2, 9];
var index = array.indexOf(2, -4); // index is assigned 0
console.log("index of 2 is ", index);
index = array.lastIndexOf(2); // index is assigned -1
console.log("index of 2 is ", index);

//var array = [2, 2, 5, 9, 2];
//var index = array.lastIndexOf(7);

const isYoung = v => v < 45;
function doubleAge(value) {
    return value * 2;
}
function ageNextYear(value) {
    return ++value;
}
function print(value, index) {
    console.log(index, " -> ", value);
}
function sum(previousValue, currentValue, index, array) {
    return previousValue + currentValue;
}
function average(accumulator, value, index, array) {
    if (index < array.length - 1) {
        return accumulator + value;
    } else {
        return (accumulator + value) / array.length;
    }
}

var result = [41, 20, 17, 50, 39, 75]
    .filter( isYoung )
    // .some( value => !isYoung(value) );
    // .filter(isYoung)
    .map(ageNextYear)
    .reduce(average, 0);
    //  .forEach(print);
console.log("YoungAvg = ", result);