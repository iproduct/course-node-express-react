const MyEmitter = require('./events-01');
console.log(MyEmitter);

const myEmitter = new MyEmitter();

var callbackA = () => {
  console.log('A');
  // myEmitter.removeListener('event', callbackB);
};

var callbackB = () => {
  console.log('B');
};

myEmitter.on('event', callbackA);

myEmitter.once('event', callbackB);

// callbackA removes listener callbackB but it will still be called.
// Internal listener array at time of emit [callbackA, callbackB]
myEmitter.emit('event');
  // Prints:
  //   A
  //   B

// callbackB is now removed.
// Internal listener array [callbackA]
myEmitter.emit('event');
  // Prints:
  //   A
myEmitter.emit('event');
  // Prints:
  //   A