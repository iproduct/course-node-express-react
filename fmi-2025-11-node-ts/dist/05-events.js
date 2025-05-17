"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const events_1 = require("events");
const emitter = new events_1.EventEmitter();
emitter.on('myevent', (payload, status) => {
    console.log(`First listener: ${JSON.stringify(payload)}, Status: ${status}`);
});
const secondListener = (payload) => {
    console.log(`Second listener: ${JSON.stringify(payload)}`);
};
emitter.once('myevent', secondListener);
emitter.emit('myevent');
emitter.emit('myevent', { name: 'Trayan', age: 45 }, 'active');
let num = 0;
const interval = setInterval(() => emitter.emit('myevent', { id: (++num), name: 'Trayan ' + num }), 2000);
// setTimeout(() => emitter.off('myevent', secondListener), 6000);
setTimeout(() => clearInterval(interval), 20000);
//# sourceMappingURL=05-events.js.map