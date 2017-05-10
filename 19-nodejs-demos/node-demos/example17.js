var fs = require("fs");
var myData = 'My custom data. ';

// Create writable stream
var writerStream = fs.createWriteStream('output.txt');

// Write data twice using 'utf8' encoding
writerStream.write(myData,'UTF8');
writerStream.write(myData,'UTF8');

// Finish writing to file
writerStream.end();

// Handle writable stream events: finish and error
writerStream.on('finish', function() {
    console.log("Writing data completed.");
});

writerStream.on('error', function(err){
   console.log(err.stack);
});

process.on('exit', function(statusCode){
   console.log(`Write stream demo completed with code ${statusCode}.` );
});
