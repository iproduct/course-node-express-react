const Readable = require('stream').Readable;

var rs = new Readable();
rs.push('one\n');
rs.push('two\n');
rs.push('three\n');
rs.push(null);

rs.pipe(process.stdout);