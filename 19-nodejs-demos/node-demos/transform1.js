'use strict';

const Transform = require('stream').Transform;

class JsonToString extends Transform {
  constructor() {
    super({
      writableObjectMode: true,
      transform(chunk, encoding, callback) {
        callback(null, JSON.stringify(chunk));
      }
    });
  }
}

module.exports = JsonToString;