async function f() {
  let promise = new Promise((resolve, reject) => {
    // setTimeout(() => resolve("Task completed result."), 2000);
    setTimeout(() => reject("Task completed with error."), 2000);
  });

  console.log('Start.'); // "start!"
  try {
    let result = await promise; // wait untill promise resolve
    console.log(result); // "done!"
    return result;
  } catch (err) {
    console.log('Rejected: ' + err); // "rejected"
    throw err;
  }
}

f()
  .then((data) => console.log('Really finished: ' + data))
  .catch((err) => console.log('Really finished REJECT: ' + err));
