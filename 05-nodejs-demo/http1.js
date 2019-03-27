/**
 * Htttp server demo - demonstrates url, request and response handling
 */

var http = require('http');
var fs = require('fs');
var url = require('url');
var path = require('path');

const public = path.join(__dirname);
console.log(public);

const PORT = 8000;
const server = http.createServer((request, response) => {
    // request is an http.IncomingMessage, which is a Readable Stream
    // response is an http.ServerResponse, which is a Writable Stream

    // Request url handling - parse to extract the required resource name ***
    var pathname = url.parse(request.url).pathname;
    console.log("\nRequest for " + pathname + " received.");
    console.log(`Request method: ${request.method}`);
    console.log(`Headers ${JSON.stringify(request.headers)}`);

    if (request.method === 'GET') {
        // Providing response - read the requested file content from file system
        fs.readFile(path.join(public, pathname.substr(1)), function (err, data) {
            if (err) {
                console.log(err);
                // 404: File not found
                response.writeHead(404, { 'Content-Type': 'text/html' });
                response.end(`
                <html>
                    <body>
                        <h1>Error Status 404: Resource "${pathname}" does not exist.</h1>
                    </body>
                </html>
                `);
            } else {
                // 200 : OK - send file
                response.writeHead(200, { 'Content-Type': 'text/html' });

                // Write the content of the file to response body
                response.write(data.toString());
            }
            // Send the response body 
            response.end();
        });

    } else if (request.method === 'POST') {
        var body = [];
        request.on('data', function (chunk) {
            body.push(chunk);
        }).on('end', function () {
            body = Buffer.concat(body).toString();
            // at this point, `body` has the entire request body stored in it as a string
            console.log(body);

            // Retun response - 201 : Created
            response.writeHead(201, {
                'content-type': 'text/html',
                'location': `http://localhost:${PORT}/page1.html`
            });
            response.write(`<html><body><a href=http://localhost:${PORT}/page1.html>page1.html</a>`);
            response.end();
        });
    }

})

// Start listening for reuests 
server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});

// Server error handling
server.on('error', (e) => {
    console.log(`Got error: ${e.message}`);
});
