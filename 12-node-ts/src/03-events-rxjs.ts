import * as events from 'events';
import { EventEmitter } from 'events';
import { interval, from, map, zip } from 'rxjs';


const emitter = new EventEmitter();

emitter.on('myevent', (payload, status) => {
    console.log(`First listener: ${JSON.stringify(payload)}, Status: ${status}`);
});
const secondListener = (payload) => {
    console.log(`Second listener: ${JSON.stringify(payload)}`);
};
emitter.on('myevent', secondListener);

const int = interval(1000);
const data = from(['Hello', 'Reactive', 'Extensions', 'for', 'JavaScript', 'from', 'Typescript', '!']);

const dataStream = zip(int, data).pipe(
    map(([num, text]) => `${num}: ${text} [${new Date().toISOString()}]`)
)

dataStream.subscribe(
    next => emitter.emit('myevent', next),
    err => console.error(err),
    () => console.log('Demo complete.')
);