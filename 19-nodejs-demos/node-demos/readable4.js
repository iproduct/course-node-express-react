'use strict';

const Readable = require('stream').Readable;

class MyReadable extends Readable {
    constructor(options) {
        super(options);
        this.char = 96;
    }

    _read() {
        if (this.char >= 'z'.charCodeAt(0)) this.push(null);
        setTimeout(() => {
            this.push(String.fromCharCode( ++this.char));
        }, 100);
    }

}

//lets test it
let rs = new MyReadable();
rs.pipe(process.stdout);

rs.on('error', process.exit);

process.on('exit', function () {
    console.error('\n_read() called ' + (rs.char - 97) + ' times');
});

