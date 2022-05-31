const http = require('http');
const fs = require('fs/promises');
const url = require('url')
const host = '127.0.0.1';
const port = 3000;

const DB_FILENAME = 'db.json';

const countries = {
  'Bulgaria': 'Sofia',
  'USA': 'Washington, D.C.'
}

const server = http.createServer((req, res) => {
  // res.statusCode = 200;
  // res.setHeader('Content-Type', 'text/plain');
  res.writeHead(200, { 'Content-Type': 'application/json' })
  // res.end(JSON.stringify(countries))

});

server.on('error', (e) => {
  if (e.code === 'EADDRINUSE') {
    console.log('Address in use, retrying...');
    setTimeout(() => {
      server.close();
      server.listen(port, host);
    }, 5000);
  } else {
    console.log('Error starting server:', err);
  }
});

fs.readFile(`${__dirname}/${DB_FILENAME}`).then(data => {
  const db = JSON.parse(data);

  const server = http.createServer((req, res) => {
    // res.statusCode = 200;
    // res.setHeader('Content-Type', 'text/plain');
    // res.end(JSON.stringify(countries))
    const pathname = url.parse(req.url, true).pathname
    if (req.method === 'GET') {
      if (pathname.slice(1) === 'api/posts') {
        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify(db.posts));
      } else if (pathname.slice(1) === 'api/users') {
        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify(db.users));
      } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' })
        res.end("Not found");
      }
    } else if (req.method === 'POST') {
      if (pathname.slice(1) === 'api/posts') {
        const body = [];
        req.on('data', chunk => {
          body.push(chunk);
        }).on('end', async () => {
          const bodyStr = Buffer.concat(body).toString();
          const newPost = JSON.parse(bodyStr);
          const maxId = db.posts.reduce((acc, val) => Math.max(acc, val.id), 0)
          console.log("Max ID: ", maxId);
          newPost.id = maxId + 1;
          console.log("Created NEW Post: ", newPost);
          db.posts.push(newPost);
          await fs.writeFile(DB_FILENAME, JSON.stringify(db, null, 4));
          res.writeHead(200, { 'Content-Type': 'application/json' })
          res.end(JSON.stringify(newPost));
        }).on('error', (err) => {
          console.error(err);
        })
      }
    }
  });

  server.on('error', (e) => {
    if (e.code === 'EADDRINUSE') {
      console.log('Address in use, retrying...');
      setTimeout(() => {
        server.close();
        server.listen(port, host);
      }, 5000);
    } else {
      console.log('Error starting server:', err);
    }
  });

  server.listen(port, host, () => {
    console.log(`HTTP Server running on http://${host}:${port}/`);
  });
}).catch(err => console.log(err));


