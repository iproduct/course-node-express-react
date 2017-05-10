'use strict';

const Readable = require('stream').Readable;

class MyReadable extends Readable {
    constructor(options) {
        super(options);
        this.char = 97;
    }

    _read() {
        this.push(String.fromCharCode(this.char++));
        if (this.char > 'z'.charCodeAt(0)) this.push(null);
    }

}

//lets test it
let rs = new MyReadable();
rs.pipe(process.stdout);