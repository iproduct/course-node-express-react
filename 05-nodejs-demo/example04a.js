'use strict';

var EventEmitter = require('events');

class MyEventEmitter extends EventEmitter {
  constructor() {
    super();
   
    setImmediate(()=>console.log("Immediate"));
    doFirstJob();
  }
}

let mee = new MyEventEmitter();

function doFirstJob() {
  setTimeout(() => console.log("First job done!"), 1);
}

mee.on('myEvent', function onMyEvent(val) {
  console.log("MyEvent received.", val);
});

console.log('end-of-program');