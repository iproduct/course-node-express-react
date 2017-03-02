
var p1 = new Promise((resolve, reject) => {
setTimeout(resolve, 1000, "one");
});
var p2 = new Promise((resolve) => 
    setTimeout(resolve, 2000, "two")
).then((value) => {
  console.log(value); // "Success!"
  throw 'oh, no!';
}).catch((reason)=>{                                       
   console.log("Rejected: ", reason);
   Promise.resolve("P2 rejected");
});
var p3 = new Promise((resolve, reject) => {
setTimeout(resolve, 3000, "three");
});
var p4 = new Promise((resolve, reject) => {
setTimeout(resolve, 4000, "four");
});


Promise.all([p1, p2, p3, p4]).then(value => {
console.log(value);
}, function(reason) {
console.log("Rejected", reason);
});
