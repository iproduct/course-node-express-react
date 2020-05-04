const http = require('http');
const path = require('path');
const fs = require('fs');

const comments = [];
let nextId = 0;
const public = path.join(__dirname, 'public');
console.log(`Public folder: ${public}`);

const server = http.createServer((request, response) => {
    const { method, url } = request;
    const { headers } = request;
    const userAgent = headers['user-agent'];
    console.log(`${method} request accepted for URL: ${url}\nHeaders:  User-Agent: ${userAgent}`);
    response.on('error', (err) => {
        console.error(err);
    });

    let body = [];
    request.on('data', (chunk) => {
        body.push(chunk);
    }).on('end', () => {
        comment = Buffer.concat(body).toString();
        if (method === 'POST' && comment) {
            if (url.startsWith('/api/comments')) {
                const newComment = JSON.parse(comment);
                newComment.id = ++nextId;
                comments.push(newComment);
                response.writeHead(201, {
                    'Content-Type': 'application/json',
                    'Location': `${url}/${newComment.id}`
                });
                response.end(JSON.stringify(comments));
            } else {
                sendError(response, 404, `Page not found: ${url}.`);
            }
        } else if (method === 'GET' && url && url.length > 0) {
            if (url.startsWith('/api/comments')) {
                response.writeHead(200, {
                    'Content-Type': 'application/json'
                });
                if(url === '/api/comments') {
                    response.end(JSON.stringify(comments));
                } else {
                    segments = url.split('/');
                    id = segments[segments.length - 1];
                    index = comments.findIndex(c => c.id === parseInt(id));
                    if(index >= 0) {
                        response.end(JSON.stringify(comments[index]));
                    } else {
                        sendError(response, 404, `Page not found: ${url}.`);
                    }
                }
            } else {
                const resourcePath = path.join(public, url);
                console.log(`Resource path: ${resourcePath}`);
                fs.readFile(resourcePath, (err, data) => {
                    if (err) {
                        console.error(err);
                        sendError(response, 404, `Page not found: ${url}.`);
                    } else {
                        response.writeHead(200, {
                            'Content-Type': 'text/html',
                            'X-Powered-By': 'My Server'
                        });
                        response.end(data.toString());
                    }
                })
            }
        } else {
            sendError(response, 404, `Page not found: ${url}.`);
        }
    }).on('error', (err) => {
        console.error(err);
    });
});
server.listen(8080, () => {
    console.log("Server started on port 8080...")
});

function sendError(response, status, message) {
    response.writeHead(404, {
        'Content-Type': 'text/html',
        'X-Powered-By': 'My Server'
    });
    response.end(`
    <html>
        <body>
            <h1>${status}: ${message}</h1>
        </body>
    </html>`);
}