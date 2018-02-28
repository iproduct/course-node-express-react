"use strict";

// const p = new Promise((resolve, reject) =>
//     setTimeout(() => {
//         if(Math.random() > 0.5)
//             resolve("Resolved value")
//         else
//             reject("Error");
//     }, 2000)
// );
const p1 = async function() {
  if (Math.random() > 0.5) 
    return "Resolved value";
  else 
    throw new Error("Error");
};

const p2 = async function() {
  return "Resolved value2";
};

Promise.all([p1(), p2()]).then(
  resp => {
    //then
    console.log(`First: ${resp}`);
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve("Next value");
      }, 2000);
    });
  },
  err => {
    //catch
    console.log(`Error: ${err}`);
  }
);
