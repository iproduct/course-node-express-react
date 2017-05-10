var crypto = require('crypto');
var fs = require('fs');
var zlib = require('zlib');

var password = new Buffer(process.env.PASS || 'password');
var encryptStream = crypto.createDecipher('aes-256-cbc', password);

var gunzip = zlib.createGunzip();
var readStream = fs.createReadStream(__dirname + '/out.gz'); // current file
var writeStream = fs.createWriteStream(__dirname + '/data.txt');

readStream   // reads current file
  .pipe(gunzip)  // de-compresses
  .pipe(encryptStream) // decrypts
  .pipe(writeStream)  // writes to out file
  .on('finish', function () {  // all done
    console.log('Decription and decompression done successfully.');
  });
  