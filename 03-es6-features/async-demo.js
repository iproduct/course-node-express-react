async function f() {
  return 1;
}
async function g() {
  throw "Error!!!";
  return 2;
}

Promise.all([f(),g()]).then(v => console.log(v), err => console.log("Rejected:" + err) ); // 1
console.log("Finished.");
// f().then(v => console.log(v));
