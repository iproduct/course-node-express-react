'use strict';

const http = require('http');
const url = require('url');
const fs = require('fs');

const hostname = '127.0.0.1';
const port = 3000;
const server = http.createServer((req, res) => {
  let pathname = url.parse(req.url).pathname;
  console.log(`Path: ${pathname}`);
  console.log(`Method: ${req.method}`);
  console.log(`Headers: ${JSON.stringify(req.headers)}`);

  if(req.method === 'GET') {
    fs.readFile(pathname.substr(1), (err, data) => {
      if(err) {
        //404: File not found
        console.error('Error reading file:', err.message, pathname);
        res.writeHead(404, {'content-type': 'text/html'});
        res.write(`
        <html>
        <body>
        <p>Sorry, file '${pathname}' not found</p>
        </body>
        </html>
        `);
      } else {
        // 200: OK
        res.writeHead(200, {'content-type': 'text/html'});
        res.write(data.toString());
      }
      res.end();
    });
  }

  res.writeHead(200, {'Content-Type':'text/html'});
  // res.statusCode = 200;
  // res.setHeader('Content-Type', 'text/html');
  res.end(`
  <html>
    <body>
      <h1>Hi from Node!</h1>
      <p>More examples comming ...</p>
      <p>Path: ${pathname}</p>
      <p>Method: ${req.method}</p>
      <p>Headers: ${JSON.stringify(req.headers)}</p>
    </body>
  </html>
  `);
});

server.listen(port, hostname, (err) => {
  if(err) console.error(err);
  console.log(`Server running at http://${hostname}:${port}/`);
});