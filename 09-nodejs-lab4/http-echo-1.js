const http = require('http');
const path = require('path');
const fs = require('fs');

const comments = [];
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
            comments.push(comment);
        } else if (method === 'GET' && url && url.length > 0) {
            if (url.startsWith('/api/comments')) {
                response.statusCode = 200;
                response.setHeader('Content-Type', 'text/html');
                response.end(JSON.stringify(comments));
            } else {
                const resourcePath = path.join(public, url);
                console.log(`Resource path: ${resourcePath}`);
                fs.readFile(resourcePath, (err, data) => {
                    if (err) {
                        console.error(err);
                        response.writeHead(404, {
                            'Content-Type': 'text/html',
                            'X-Powered-By': 'My Server'
                        });
                        response.end(`
                        <html>
                            <body>
                                <h1>404: Page not found: ${url}.</h1>
                            </body>
                        </html>`);
                        return;
                    }
                    response.writeHead(200, {
                        'Content-Type': 'text/html',
                        'X-Powered-By': 'My Server'
                    });
                    response.end(data.toString);
                })
            }

        }

        // response.write('<html>');
        // response.write('<body>');
        // response.write(`<h1>Hello, World from ${url}!</h1>`);
        // response.write('</body>');
        // response.write('</html>');
        response.write(`
    <html>
        <body>
            <h1>Hello, World from ${url}!</h1>
            <table>`);
        for (h in headers) {
            response.write(`<tr><td width="300">${h}:</td><td>${headers[h]}</td></tr>`);
        }
        response.end(`
            </table>
            <h2>Comments:</h2>
            <ul>
                ${comments.map(c => '<li>' + c + '</li>')}
            </ul>
        </body>
    </html>`);
    }).on('error', (err) => {
        console.error(err);
    });
});
server.listen(8080, () => {
    console.log("Server started on port 8080...")
});