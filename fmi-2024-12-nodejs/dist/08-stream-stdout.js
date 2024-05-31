"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_stream_1 = require("node:stream");
var rs = new node_stream_1.Readable();
rs.pipe(process.stdout);
rs.push('beep ');
rs.push('boop\n');
rs.push(null);
//# sourceMappingURL=08-stream-stdout.js.map