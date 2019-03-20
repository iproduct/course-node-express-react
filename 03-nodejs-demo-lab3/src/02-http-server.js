const http = require('http');

const hostname = 'localhost';
const port = 3000;
const todos = [
    {title: 'Create HTTP server', status: 'active'},
    {title: 'Create HTTP client', status: 'active'},
    {title: 'Test HTTP server using client', status: 'active'},
    {title: 'Add POST method', status: 'active'},
    {title: 'Add DELETE method', status: 'active'},
]
const server = http.createServer( (req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(todos));
});

server.listen(port, (err) => {
    if(err) console.log(err);
    else console.log(`Server running at http://${hostname}:${port}/`);
})