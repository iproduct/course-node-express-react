const http = require('http');
const hostname = '127.0.0.1';
const port  = 5000;
const server = http.createServer((req, res) => {
    // res.statusCode = 200;
    // res.setHeader('Content-Type', 'text/plain');
    res.writeHead(200, {'Content-Type': 'text/plain'})
    res.end('Hello from Node JS!!!')
});

server.listen(port, hostname, (err) =>{
    if(err) {
        console.log(err);
        return;
    }
    console.log(`Server is running at http://${hostname}:${port}/`)
});