const events = require('events')
const eventEmitter = new events.EventEmitter()

// First listener
const listener1 = () => console.log("listener 1 called.")

// Second listener
const listener2 = (payload) => console.log("listener 2 called with payload: " + payload)

eventEmitter.addListener('myevent', listener1)
eventEmitter.on('myevent', listener2)

console.log('Count:', eventEmitter.listenerCount('myevent'))

eventEmitter.emit('myevent', 'Custom payload 1')

eventEmitter.removeListener('myevent', listener1)
console.log('Count:', eventEmitter.listenerCount('myevent'))

eventEmitter.emit('myevent', 'Custom payload 2')