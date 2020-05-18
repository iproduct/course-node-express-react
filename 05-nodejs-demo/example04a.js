'use strict';

const EventEmitter = require('events');
const process = require('process');

class MyEventEmitter extends EventEmitter {
  constructor() {
    super();
   
    setImmediate(()=>console.log("Immediate"));
    doFirstJob();
  }
}

let mee = new MyEventEmitter();

function doFirstJob() {
  process.nextTick(() => console.log("First job done!"));
}

mee.on('myEvent', function onMyEvent(val) {
  console.log("MyEvent received: ", val);
});

mee.emit('myEvent', "Message 1");

console.log('end-of-program');