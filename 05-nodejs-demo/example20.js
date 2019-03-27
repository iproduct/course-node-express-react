/**
 * Htttp client demo - requires Http server demo to be started - example19.js
 */
var http = require('http');

// Request data
var options = {
    host: 'localhost',
    port: '3000',
    path: '/page1.html'
};

// Callback function is used to deal with response
var callback = function (response) {

    // Continuously update stream with data
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
}

// Make a request to the server
var request = http.request(options, callback);
request.end();

// Handle errors
request.on('error', (e) => {
  console.log(`Got error: ${e.message}`);
});


