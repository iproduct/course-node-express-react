const Rx = require('rxjs');
const s1 = Rx.from(["one", "two", "three"]);
const s2 = Rx.from(["Reactive", "Extensions", "JavaScript"]);
const map = require('rxjs/operators').map;
const take = require('rxjs/operators').take;
Rx.zip(s1, s2).pipe(
   take(2),
   map(s => s + " : on " + new Date())
).subscribe(s => console.log(s));