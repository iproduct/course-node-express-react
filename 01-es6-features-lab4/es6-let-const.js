'use strict';

for (var i = 0; i < 10; i++) {
  (function(x) {
    setTimeout(() => {
      console.log(x);
    }, x * 1000);
  })(i);
}

for (let i = 0; i < 10; i++) {
  setTimeout(() => {
    console.log(i);
  }, i * 1000);
}
