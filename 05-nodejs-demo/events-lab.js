const events = require('events');

const emitter = new events.EventEmitter();
emitter.on('myevent', (payload, status) => {
    console.log(`Event received: ${JSON.stringify(payload)},  ${JSON.stringify(status)}`);
});

emitter.on('myevent', (payload, status) => {
    console.log(`Composite event: ${JSON.stringify({...payload, ...status})}`);
});

emitter.emit('myevent');
emitter.emit('myevent', {name:'Trayan', age: 35});
emitter.emit('myevent', {name:'Trayan', age: 35}, {status: 'ready'});
