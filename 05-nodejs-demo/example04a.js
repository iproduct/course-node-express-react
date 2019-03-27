'use strict';

var EventEmitter = require('events');

class MyEventEmitter extends EventEmitter {
  constructor() {
    super();
    doFirstJob();
    setImmediate(()=>this.emit('myEvent', 'setImmediate'));
  }
}

let mee = new MyEventEmitter();

function doFirstJob() {
  
  console.log("Firs job done!");
}

mee.on('myEvent', function onMyEvent(val) {
  console.log("MyEvent received.", val);
});

console.log('end-of-program');