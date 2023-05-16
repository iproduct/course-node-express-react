import { Readable } from 'node:stream';

var rs = new Readable();
rs.pipe(process.stdout);
rs.push('beep ');
rs.push('boop\n');
rs.push(null);

