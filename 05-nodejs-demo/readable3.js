'use strict';

const Readable = require('stream').Readable;

//lets test it
let rs = new Readable(
    function (char) {
        return {
            read(size) {
                this.push(String.fromCharCode(char++));
                if (char > 'z'.charCodeAt(0)) this.push(null);
            }
        }
    } (97) // IIFE
);
rs.pipe(process.stdout);
