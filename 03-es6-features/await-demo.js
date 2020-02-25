async function f() {
  let promise = new Promise((resolve, reject) => {
    setTimeout(() => resolve("Task completed."), 2000);
  });

  console.log('Start.'); // "start!"
  let result = await promise; // wait untill promise resolve

  console.log(result); // "done!"
}

f().then(() => console.log('Really finished.'));
