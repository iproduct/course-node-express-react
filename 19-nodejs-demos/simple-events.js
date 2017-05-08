'use strict';

const EventEmitter = require('events');

module.exports = new EventEmitter();

// Do some work, and after some time emit
// the 'ready' event from the module itself.
let interval = setInterval(() => {
  module.exports.emit('ready', 'Event payload');
}, 1000);
interval.unref();
setTimeout(() => {
  console.log("Timeout");
  // interval.ref();
}, 5000);

