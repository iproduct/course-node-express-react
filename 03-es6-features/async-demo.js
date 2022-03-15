async function f() {
  return new Promise((resolve, reject) =>setTimeout(reject, 3000,"Error here!!!")); //Promise.resolve(1);
}
async function g() {
  // throw "Error!!!";
  return 2;
}

Promise.all([f(),g()])
  .then(v => console.log(v))
  .catch( err => console.log("Rejected:" + err) ); // 1
console.log("Finished.");
// f().then(v => console.log(v));
