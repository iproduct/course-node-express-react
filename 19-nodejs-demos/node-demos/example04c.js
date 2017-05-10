'use strict';

var EventEmitter = require('events');  
var util = require('util');

function MyEventEmitter() {  
  EventEmitter.call(this);

  doFirstJob();
  setImmediate(this.emit.bind(this, 'myEvent'));
}
util.inherits(MyEventEmitter, EventEmitter); //slower

var mee = new MyEventEmitter();

function doFirstJob() {  
 console.log("Firs job done!");
}

mee.on('myEvent', function onMyEvent() {  
 console.log("MyEvent received.", this);
});