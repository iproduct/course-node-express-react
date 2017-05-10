

var p5 = new Promise(function(resolve, reject) {
setTimeout(resolve("p5"), 500, "five");
});
var p6 = new Promise(function(resolve, reject) {
setTimeout(reject("p6"), 100, "six");
});

Promise.race([p5, p6]).then(function(value) {
// Not called
}, function(reason) {
console.log(reason); // "six"
// p6 is faster, so it rejects
});
