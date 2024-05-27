"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_stream_1 = require("node:stream");
const rs = new node_stream_1.Readable();
var c = 65 - 1;
rs._read = function () {
    if (c >= 'z'.charCodeAt(0))
        return rs.push(null);
    setTimeout(function () {
        rs.push(String.fromCharCode(++c));
    }, 100);
};
rs.pipe(process.stdout);
//# sourceMappingURL=10-stream-letters-async.js.map