async function f() {
  return new Promise((resolve, reject) => setTimeout(reject, 3000, "Rejected with Error!"));
  return Promise.resolve(1);
}
async function g() {
  // return Promise.reject("Error!!!");
  throw "Error!!!";
  // return 2;
}

// console.log(g());

Promise.all([f(), g()])
  .then(v => console.log(v))
  .catch(err => console.log("Rejected:" + err))
  .catch(err => console.log("Finally Rejected:" + err))
  .finally(() => console.log("Finished."));

// f().then(v => console.log(v));
