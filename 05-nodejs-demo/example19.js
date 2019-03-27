/**
 * Htttp server demo - demonstrates url, request and response handling
 */

var http = require('http');
var fs = require('fs');
var url = require('url');

const PORT = 3000;
const server = http.createServer((request, response) => {
    // request is an http.IncomingMessage, which is a Readable Stream
    // response is an http.ServerResponse, which is a Writable Stream

    // Request url handling - parse to extract the required resource name ***
    var pathname = url.parse(request.url).pathname;
    console.log("Request for " + pathname + " received.");

    // Providing response - read the requested file content from file system
    fs.readFile(pathname.substr(1), function (err, data) {
        if (err) {
            console.log(err);
            // 404: File not found
            response.writeHead(404, { 'Content-Type': 'text/html' });
        } else {
            /// 200 : OK - send file
            response.writeHead(200, { 'Content-Type': 'text/html' });

            // Write the content of the file to response body
            response.write(data.toString());
        }
        // Send the response body 
        response.end();
    });

})

// Start listening for reuests 
server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});

// Server error handling
server.on('error', (e) => {
  console.log(`Got error: ${e.message}`);
});
