'use strict';

const EventEmitter = require('events');

module.exports = class MyEmitter extends EventEmitter {}

// const myEmitter = new MyEmitter();
// myEmitter.on('event', (a, b) => {
//   console.log(a, b, this);
//     // Prints:
//     //   a b MyEmitter {
//     //     domain: null,
//     //     _events: { event: [Function] },
//     //     _eventsCount: 1,
//     //     _maxListeners: undefined }
// });
// myEmitter.emit('event', 'a', myEmitter);