'use strict';

const Readable = require('stream').Readable;

//lets test it
let rs = new Readable(
    function (char) {
        return {
            read(size) {
                if (char >= 'z'.charCodeAt(0)) this.push(null);
                setTimeout(() => {
                    this.push(String.fromCharCode(++char));
                }, 100);
            }
        }
    } (96)
);
rs.pipe(process.stdout);

rs.on('error', process.exit);

process.on('exit', function () {
    console.error('\n_read() called ');
});
