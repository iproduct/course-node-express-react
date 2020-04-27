const events = require('events');

const emitter = new events.EventEmitter();
emitter.on('myevent', (payload, status) => {
    console.log(`Event received: ${JSON.stringify(payload)},  ${JSON.stringify(status)}`);
});

const listener2 = (payload, status) => {
    console.log(`Composite event: ${JSON.stringify({...payload, ...status})}`);
}

emitter.once('myevent', listener2);

emitter.emit('myevent');
emitter.emit('myevent', {name:'Trayan', age: 35});

let num = 1;

const interval = setInterval(() => {
    emitter.emit('myevent', {num: num++, name:'Trayan', age: 35}, {status: 'ready'})
}, 3000);

setTimeout(() => clearInterval(interval), 30000);

// emitter.off('myevent', listener2);
