'use strict';

for (let i = 0; i < 10; i++) {
  setTimeout(function() {
    console.log(i);
  }, i * 1000);
}



// var i;
// for (i = 0; i < 10; i++) {
//   (function(n) {
//     setTimeout(function () {
//       console.log(n);
//     }, i * 1000)
//   }) (i); // IIFE
// }