'use strict';

for (let i = 0; i < 10; i++) {
  setTimeout(function() {
    console.log(i);
  }, i * 1000);
}