'use strict';

const Transform = require('stream').Transform;

class AddNewLine extends Transform {
  constructor() {
    super({
      transform(chunk, encoding, callback) {
        callback(null, chunk + "\n");
      }
    });
  }
}

module.exports = AddNewLine;