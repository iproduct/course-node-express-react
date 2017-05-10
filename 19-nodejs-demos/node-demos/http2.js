/**
 * Htttp server demo - demonstrates url, request and response handling
 */
const http = require('http');
const fs = require('fs');
const url = require('url');

const PORT = 8000;
const server = http.createServer((request, response) => {
    // request is an http.IncomingMessage, which is a Readable Stream
    // response is an http.ServerResponse, which is a Writable Stream

    // Request url handling - parse to extract the required resource name 
    var pathname = url.parse(request.url).pathname;
    console.log("\nRequest for " + pathname + " received.");
    console.log(`Request method: ${request.method}`);
    console.log(`Headers ${JSON.stringify(request.headers)}`);

    if (request.method === 'GET') {
        // Providing response - read the requested file content from file system
        fs.readFile(pathname.substr(1), function (err, data) {
            if (err) {
                console.log(err);
                // 404: File not found
                response.writeHead(404, { 'Content-Type': 'text/html' });
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
        let headers = request.headers;
        let method = request.method;
        let url = request.url;
        let body = [];

        //Handle request events: data, end, error
        request.on('error', function (err) {
            console.error(err);
        }).on('data', function (chunk) {
            body.push(chunk);
        }).on('end', function () {
            body = Buffer.concat(body).toString();
            // at this point, `body` has the entire request body stored in it as a string
            console.log(body);

            //Start emiting response
            //Handle response errors
            response.on('error', function (err) {
                console.error(err);
            });

            // Retun response - 201 : Created
            // response.statusCode = 200;
            // response.setHeader('Content-Type', 'application/json');
            response.writeHead(201, {
                'content-type': 'application/json',
                'location': `http://localhost:${PORT}/echo`
            });
            var responseBody = {
                headers: headers,
                method: method,
                url: url,
                body: body
            };
            response.write(JSON.stringify(responseBody));
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
    console.error(`Got error: ${e.message}`);
});
