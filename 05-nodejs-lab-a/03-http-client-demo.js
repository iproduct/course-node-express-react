var http = require('http');

const todo = { id: 1, text: 'Add POST handling to server.', status: 'active' };
const postData = JSON.stringify(todo);

const options = {
  hostname: 'localhost',
  method: 'post',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(postData, 'utf-8'),
  },
  port: 3000,
  path: '/api/todos'
};

const req = http.request(options, (res) => {
  console.log(`STATUS: ${res.statusCode}`);
  console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
  res.setEncoding('utf8');
  res.on('data', (chunk) => {
    console.log(`BODY: ${chunk}`);
  });
  res.on('end', () => {
    console.log('No more data in response.');
  });
});

req.on('error', (e) => {
  console.error(`problem with request: ${e.message}`);
});

// write data to request body
req.write(postData);
req.end();