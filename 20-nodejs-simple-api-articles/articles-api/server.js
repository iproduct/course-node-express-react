'use strict';

const http = require('http');
const url = require('url');
const fs = require('fs');
const Article = require('./article-model');
const ArticleService = require('./article-service');

const hostname = '127.0.0.1';
const port = 9000;
const service = new ArticleService('articles.json');

const server = http.createServer((req, res) => {
    let pathname = url.parse(req.url).pathname;

    console.log(`Path: ${pathname}`);
    console.log(`Method: ${req.method}`);
    console.log(`Headers: ${JSON.stringify(req.headers)}`);

    if (req.method === 'GET') {
        let resource = pathname.substr(1);
        let path = resource.split('/');

        if (path.length > 1 && path[0] === 'api') {
            if (path[1] === 'articles') {
                service.findAll((err, articles) => {
                    if (err) {
                        // 500: File not found
                        console.error(`Error reading file: ${err.message}`);
                        res.writeHead(500, { 'Content-Type': 'text/html' }); //TODO set appropriate MIME type
                        res.write(`
                            <html>
                                <body>
                                    <p>Sorry DB file not found</p>
                                </body>
                            </html>
                        `);
                    } else {
                        res.writeHead(200, { 'Content-Type': 'application/json' });
                        res.end(JSON.stringify(articles));
                    }
                });
            }
        } else {

            if (resource === '') {
                resource = 'index.html';
            }

            resource = process.cwd() + '/build/' + resource;

            fs.readFile(resource, (err, data) => {
                if (err) {
                    // 404: File not found
                    console.error(`Error reading file: ${err.message}`, resource);
                    res.writeHead(404, { 'Content-Type': 'text/html' }); //TODO set appropriate MIME type
                    res.write(`
                    <html>
                        <body>
                            <p>Sorry file '${resource}' not found</p>
                        </body>
                    </html>
                `);
                } else {
                    // 200: OK
                    res.writeHead(200, { 'Content-Type': 'text/html' });
                    res.write(data.toString());
                }

                res.end();
            });
        }
    } else if (req.method === 'POST') {
        let headers = req.headers;
        let method = req.method;
        let rUrl = req.url;
        let body = [];


        let resource = pathname.substr(1);
        let path = resource.split('/');

        if (path.length > 1 && path[0] === 'api') {
            if (path[1] === 'articles') {
                //Handle req events: data, end, error
                req.on('error', function (err) {
                    console.error(err);
                }).on('data', function (chunk) {
                    body.push(chunk);
                }).on('end', function () {
                    body = Buffer.concat(body).toString('utf-8');
                    // at this point, `body` has the entire req body stored in it as a string

                    console.log('Body:', body);
                    const newArticle = JSON.parse(body);
                    console.log('After parse:', newArticle);

                    res.on('error', function (err) {
                        console.error(err);
                    });

                    service.add(newArticle, (err, articles, newArticle) => {
                        res.writeHead(201, { 'Content-Type': 'application/json', 'Location': `http://127.0.0.1:${port}/articles/${newArticle.id}` });
                        res.end(JSON.stringify(articles));
                    });
                });
            }
        }
    } else if (req.method === 'DELETE') {
        let headers = req.headers;
        let method = req.method;
        let rUrl = req.url;

        let resource = pathname.substr(1);
        let path = resource.split('/');

        if (path.length === 3 && path[0] === 'api' && path[1] === 'articles') {
            const commentId = path[path.length - 1];
            console.log('ArticleId to be deleted:', commentId);
            res.on('error', function (err) {
                console.error(err);
            });

            // delete comment by id
            service.delete(commentId, (err, articles, newArticle) => {
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(articles));
            });
        }
    } else {
        const body = [];
        //Handle req events: data, end, error
        req.on('error', function (err) {
            console.error(err);
        }).on('data', function (chunk) {
            body.push(chunk);
        }).on('end', function () {
            body = Buffer.concat(body).toString();
            // at this point, `body` has the entire req body stored in it as a string
            console.log(body);

            //Start emiting res
            //Handle res errors
            res.on('error', function (err) {
                console.error(err);
            });

            // Retun res - 200 : OK
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            // res.writeHead(200, {
            //     'content-type': 'application/json',
            //     'location': `http://127.0.0.1:${port}/echo`
            // });

            var resBody = {
                headers: headers,
                method: method,
                url: rUrl,
                body: body
            };

            res.write(JSON.stringify(resBody));
            res.end();
        });
    }

});
server.listen(port, hostname, (err) => {
    if (err) console.error(err);
    console.log(`Server running at http://${hostname}:${port}/`);
});