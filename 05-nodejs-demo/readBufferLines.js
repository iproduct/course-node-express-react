const fs = require('fs');

let readStream = fs.createReadStream(__filename); // current file

let offset = 0;
readStream.on('readable', function () {
    let buf = readStream.read();
    if (!buf) return;
    for (; offset < buf.length; offset++) {
        if (buf[offset] === 0x0a) {
            console.dir(buf.slice(0, offset).toString());
            buf = buf.slice(offset + 1);
            offset = 0;
            readStream.unshift(buf);
            return;
        }
    }
    readStream.unshift(buf);
});
