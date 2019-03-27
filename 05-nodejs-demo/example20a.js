/**
 * Htttp client demo - requires Http server demo to be started - example19.js
 * Shorter - using http.get()
 */
var http = require('http');

http.get('http://localhost:3000/', (response) => {
    console.log(`Got response with status code: ${response.statusCode}`);
    
    // Check status of HTTP response
    if (response.statusCode >= 200 && response.statusCode < 300) {
        var body = '';

        // new data chunk received 
        response.on('data', function (chunk) {
            body += chunk;
        });

        response.on('end', function () {
            // Data received completely.
            console.log(body);
        });
    } else {
        console.log(`HTTP error: ${response.statusCode}: ${response.statusMessage}` );
    }
}).on('error', (e) => {
    console.log(`Got error: ${e.message}`);
});

