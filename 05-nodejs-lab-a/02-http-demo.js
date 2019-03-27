const http = require('http');
const hostname = '127.0.0.1';
const port = 3000;
const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/html');
  res.end(`
    <h1>Hello from Node.js!</h1>
    <h2>Simple to start.</h2>`
  );
});

server.listen(port, hostname, (err) => {
  if (err) console.error(err);
  else console.log(`Server running at http://${hostname}:${port}/`);
});