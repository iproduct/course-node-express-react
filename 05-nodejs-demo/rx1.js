const Rx = require('rxjs');
let s1 = Rx.Observable.from(["one", "two", "three"]);
Rx.Observable.from(["Reactive", "Extensions", "JavaScript"])
.zip(s1)
   .take(2)
//    .map(s => s + " : on " + new Date())
   .subscribe(s => console.log(s));