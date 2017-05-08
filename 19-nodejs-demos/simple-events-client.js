const emitter = require('./simple-events');
emitter.on('ready', (data) => {
  console.log('module a is ready', data);
});