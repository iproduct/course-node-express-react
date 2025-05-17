"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http = require("http");
const url_1 = require("url");
const HOST = 'localhost';
const PORT = 3000;
const server = http.createServer((req, res) => {
    const path = new url_1.URL(req.url, `http://${HOST}:${PORT}`).pathname;
    // res.statusCode = 200
    // res.setHeader('Content-Type', 'text/html')
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write('<h1>Hello from NodeJS</h1>');
    res.write('<h2>from TypeScript</h2>');
    res.write(`<p>Request for path: ${path}</p>`);
    res.write(`<p>HTTP Method: ${req.method}</p>`);
    res.end(`<p>Headers: ${JSON.stringify(req.headers)}</p>`);
});
server.listen(PORT, HOST, () => {
    console.log(`HTTP Server listening on: http://${HOST}:${PORT}`);
});
server.on('error', err => {
    console.log(`Server error: ${err}`);
});
//# sourceMappingURL=04-http-server-hello.js.map