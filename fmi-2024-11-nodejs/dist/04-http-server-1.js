"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http = require("http");
const url = require("url");
const HOSTNAME = 'localhost';
const PORT = 9000;
const server = http.createServer((req, res) => {
    const path = url.parse(req.url).path;
    // res.statusCode = 200;
    // res.setHeader('Content-Type', 'text/html');
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write('<h1>Hello from Node.js</h1>');
    res.write('<h2>Using TypeScript</h2>');
    res.write(`<p>Request Path: ${JSON.stringify(path)}</p>`);
    res.write(`<p>HTTP Method: ${req.method}</p>`);
    res.end(`<p>${Object.keys(req.headers).map(key => key + ': ' + req.headers[key]).join('<br>')}</p>`);
});
server.listen(PORT, HOSTNAME, () => {
    console.log(`HTTP Server listeneing on: http://${HOSTNAME}:${PORT}`);
});
server.on('error', err => console.error(`Server Error: ${err}`));
server.on('clientError', err => console.error(`Client Error: ${err}`));
//# sourceMappingURL=04-http-server-1.js.map