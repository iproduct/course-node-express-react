const http = require ('http');
const fs = require('fs');
const url = require('url');

const PORT = 8000;
const server = http.createServer( (request, response) => {
    var path = url.parse(request.url).pathname;
    console.log(`\nRequest for: ${path}`);
    console.log(`\nRequest METHOD: ${request.method}`);
    console.log(`\nRequest HEADERS: ${JSON.stringify(request.headers)}`);
    response.writeHead(200, {'content-type': 'text/html'});
    // response.statusCode = 200;
    // response.setHeader('content-type', 'text/html');
    response.end(`
    <html>
        <body>
            <h1>Hi from Node!</h1>
        </body>
    </html>
    `);
});

server.listen(PORT, () =>{
    console.log(`Server running on port ${PORT}`);
})

server.on('error', (err) => {
    console.error(`Got error ${err}`);
})
