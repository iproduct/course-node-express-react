const http = require('http');
const url = require('url');
const querystring = require('querystring');
const fs = require('fs');

const hostname = '127.0.0.1';
const PORT = 3000;
const todoDb = [];
let todoId = 0;
const server = http.createServer((req, res) => {
    //parse URL
    const urlObj = url.parse(req.url);
    const path = urlObj.path;
    const queryStr = urlObj.query;
    const query = querystring.parse(queryStr);

    console.log(`Path: ${path}`);
    console.log(`Query: ${JSON.stringify(query)}`);
    console.log(`Method: ${req.method}`);
    console.log(`Method: ${JSON.stringify(req.headers)}`);

    if (req.method === 'GET') {
        // Providing response - read the requested file content from file system
        fs.readFile(path.substr(1), function (err, data) {
            if (err) {
                console.log(err);
                // 404: File not found
                res.writeHead(404, { 'Content-Type': 'text/html' });
            } else {
                // 200 : OK - send file
                res.writeHead(200, { 'Content-Type': 'text/html' });

                // Write the content of the file to response body
                res.write(data.toString('utf-8'));
            }
            // Send the response body 
            res.end();
        });

    }
    else if (req.method === 'POST') {
        if (path === '/api/todos') {
            var body = [];
            req.on('data', function (chunk) {
                body.push(chunk);
            }).on('end', function () {
                body = Buffer.concat(body).toString();
                // at this point, `body` has the entire request body stored in it as a string
                console.log(body);
                const todo = JSON.parse(body);
                todo.id = ++todoId;
                todoDb.push(todo);

                // Retun response - 201 : Created
                res.writeHead(201, {
                    'content-type': 'application/json',
                    'location': `http://localhost:${PORT}/api/todos/${todo.id}`
                });
                res.write(JSON.stringify(todo));
                res.end();
            });
        } else {
            // 404: File not found
            res.writeHead(404, { 'Content-Type': 'text/html' });
            res.end(`<h1>Resource ${path} does not exist`);
        }
    }
});

server.listen(PORT, hostname, (err) => {
    if (err) console.error(err);
    else console.log(`Server running at http://${hostname}:${PORT}/`);
});