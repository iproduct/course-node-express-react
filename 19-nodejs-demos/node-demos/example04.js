'use strict';

var EventEmitter = require('events').EventEmitter;
var util = require('util');

const log = [];

class MemoryWatcher extends EventEmitter {
  constructor(options) {
    super();
    options = options || {
      frequency: 2000 // 10 seconds
    };
    setInterval(() => {
      var bytes = process.memoryUsage().rss; // resident set size
      if (options.maxBytes && bytes > options.maxBytes) {
        this.emit('error', new Error('Memory exceeded ' + options.maxBytes + ' bytes'));
      } else {
        this.emit('data', bytes);
      }
    }, options.frequency);
  }
}


//Use it!
var watcher = new MemoryWatcher({
  maxBytes: 25120000,
  frequency: 500
  
});

watcher.on('data', function (bytes) {
  log.push(bytes);
  console.log(bytes);
})

watcher.on('error', function (err) {
  console.log('error: ', err);
  process.exit(1);
});
