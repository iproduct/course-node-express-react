"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_stream_1 = require("node:stream");
const rs = new node_stream_1.Readable();
let c = 97;
rs._read = function () {
    rs.push(String.fromCharCode(c++));
    if (c > 'z'.charCodeAt(0))
        rs.push(null);
};
rs.pipe(process.stdout);
//# sourceMappingURL=09-stream-letters.js.map