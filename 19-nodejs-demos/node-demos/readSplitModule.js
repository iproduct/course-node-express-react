const fs = require('fs');
const split = require('split');

let readStream = fs.createReadStream('countries.txt'); 

let offset = 0;
let n = 0;
readStream
  .pipe(split(JSON.parse))
  .on('data', function (line) {
    line.id = ++n;
    console.log(`${n}: ${JSON.stringify(line)}`);
  });