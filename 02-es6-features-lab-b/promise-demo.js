"use strict";

const p1 = new Promise((resolve, reject) => {
  setTimeout(resolve, 2000, "Async result after 2 sec.");
});

p1.then(result => {
    console.log(`Resolved: ${result}`);
    if (Math.random() > 0.5) {
      return new Promise((resolve, reject) => {
        setTimeout(resolve, 1000, "Second result after 1 more sec.");
      });
    } else {
      return Promise.reject("Error immediately!!!");
    }
  })
  .then(result => {
    console.log(`Resolved: ${result}`);
  })
  .catch(err => {
    console.log(`Rejected: ${err}`);
  });
