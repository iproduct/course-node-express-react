import { Readable } from 'node:stream';

const rs = new Readable();
var c = 65 - 1;

rs._read = function () {
    if (c >= 'z'.charCodeAt(0)) return rs.push(null);
    
    setTimeout(function () {
        rs.push(String.fromCharCode(++c));
    }, 100);
};
rs.pipe(process.stdout);
 


