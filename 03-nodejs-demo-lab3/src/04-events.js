const events = require('events');

const emmiter = new events.EventEmitter();
emmiter.on('myevent', (data, status) =>{
    console.log(`Listener1: Event received: ${data.text}`);
    console.log(`Listener1: Status received: ${JSON.stringify(status)}`);
});
emmiter.on('myevent', (data, status) =>{
    console.log(`Listener2: Event received: ${(JSON.stringify({...data, ...status}))}`);
});

emmiter.emit('myevent',{text: 'Hello', type: 'message'}, {status: 'active'});
emmiter.emit('myevent', {text: 'from', type: 'message'});
emmiter.emit('myevent', {text: 'Node', type: 'message'},{status: 'ready'});


