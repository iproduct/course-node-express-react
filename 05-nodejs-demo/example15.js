var events = require('events');
var eventEmitter = new events.EventEmitter();

// First listener
var listner1 = function listner1() {
   console.log('listner1 executed.');
}

// Second listener
var listner2 = function listner2() {
  console.log('listner2 executed.');
}

// Bind listner1 to myevent
eventEmitter.addListener('myevent', listner1);

// Bind listner2 to myevent
eventEmitter.once('myevent', listner2);

var eventListeners = require('events').EventEmitter.listenerCount(eventEmitter,'myevent');
console.log(eventListeners + " listner(s) listening to myevent.");

// Fire myevent
eventEmitter.emit('myevent');

// Remove binding of listner1
eventEmitter.removeListener('myevent', listner1);
console.log("Listner1 removed.");

// Fire myevent
eventEmitter.emit('myevent');

eventListeners = require('events').EventEmitter.listenerCount(eventEmitter,'myevent');
console.log(eventListeners + " listner(s) listening to myevent.");

console.log("Demo finished.");