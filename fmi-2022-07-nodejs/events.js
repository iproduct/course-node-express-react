const EventEmitter = require('events');
const rx = require('rxjs');

class MyEventEmitter extends EventEmitter {
    constructor() {
        super();
        console.log('MyEventEmitter created succesfully')
    }
}

const mee = new MyEventEmitter();
mee.on('myEvent', event => {
    console.log('Event Litener 1 received:', event);
});

setTimeout(() => {
    mee.once('myEvent', event => {
        console.log('Event Litener 2 received:', event);
    });
}, 1000);


// genrate events of type myEvent

rx.interval(450).pipe(
    rx.take(5)
).forEach(
    i => mee.emit('myEvent', 'Hello event ' + i)
);

// for (let i = 0; i < 5; i++) {
//     setTimeout(() => mee.emit('myEvent', 'Hello event ' + i), i * 500);
// }


