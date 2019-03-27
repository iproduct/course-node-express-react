var EventEmitter = require('events');  
var util = require('util');

function MyEventEmitter() {  
  EventEmitter.call(this);

  doFirstJob();
  setImmediate(() => this.emit('myEvent'));
}
util.inherits(MyEventEmitter, EventEmitter);

var mee = new MyEventEmitter();

function doFirstJob() {  
 console.log("First job done!");
}

mee.on('myEvent', function onMyEvent() {  
 console.log("MyEvent received.");
});