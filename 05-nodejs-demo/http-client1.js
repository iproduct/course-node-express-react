const http = require('http');
const querystring = require('querystring');

// var postData = querystring.stringify({
//   'msg' : 'Hello World!'
// });
var postData = JSON.stringify({
  'msg' : 'Hello World!'
});

var options = {
  hostname: 'localhost',
  port: 8000,
  path: '/',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(postData)
  }
};

var req = http.request(options, (res) => {
  console.log(`STATUS: ${res.statusCode}`);
  console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
  res.setEncoding('utf8');
  res.on('data', (chunk) => {
    console.log(`BODY: ${chunk}`);
  });
  res.on('end', () => {
    console.log('<END_OF_THE_RESPONSE>')
  })
});

req.on('error', (e) => {
  console.log(`problem with request: ${e.message}`);
});

// write data to request body
req.write(postData);
req.end();