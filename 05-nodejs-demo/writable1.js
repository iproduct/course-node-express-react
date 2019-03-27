'use strict';

const Writable = require('stream').Writable;
const fs = require('fs');
const split = require('split');

class MyWritable extends Writable {
    constructor(options) {
        options = options || {objectMode: true};
        super(options);
    }
    _write(chunk, enc, next) {
        console.log(chunk);
        next();
    }
}

let readStream = fs.createReadStream('./countries.txt'); 
readStream
  .pipe(split(JSON.parse))
  .pipe(new MyWritable());

  exports.MyWritable = MyWritable;