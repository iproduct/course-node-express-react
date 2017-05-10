'use strict';

var EventEmitter = require('events');

class MyEventEmitter extends EventEmitter {
  constructor() {
    super();
    doFirstJob();
    setImmediate(() => this.emit('myEvent'));
  }
}

let mee = new MyEventEmitter();

function doFirstJob() {
  
  console.log("Firs job done!");
}

mee.on('myEvent', function onMyEvent() {
  console.log("MyEvent received.");
});