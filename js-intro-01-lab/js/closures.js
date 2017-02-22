// for (var i = 0; i < 10; i++) {
//   (function(x) {
//     var f = function () {
//       console.log(x);
//     };
//     setTimeout(f, x * 1000);
//   }) (i);
// }

for (let i = 0; i < 10; i++) {
  setTimeout(function() {console.log(i);}, i * 1000);
}