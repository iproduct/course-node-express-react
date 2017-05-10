var fs = require("fs");
var data = '';

// Create a readable stream
var readerStream = fs.createReadStream('node/page1.html');

readerStream.setEncoding('UTF8');

// Handle readable stream events: data, end, and error
readerStream.on('data', function(chunk) {
   data += chunk;
});

readerStream.on('end',function(){
   console.log(data);
});

readerStream.on('error', function(err){
   console.log(err.stack);
});

process.on('exit', function(statusCode){
   console.log(`Readable stream demo completed with code ${statusCode}.` );
});

