const util = require('util');
// const promise = util.promisify(setImmediate);
const myfn = (err, val) => { 
    console.log(value);
};
const func = (val, callback) => { 
    console.log("inside"); 
    if(callback) callback(undefined, val); 
    else val();
};
const promise = util.promisify( func );
console.log(promise);

promise('foo').then(value => {
    console.log(value);
});

// or with async function
async function timerExample() {
  console.log('Before I/O callbacks');
  await promise();
  console.log('After I/O callbacks');
}
timerExample();
