var https = require('https');
var fs = require('fs');

const hostname = '127.0.0.1';
const port = 8000;

var options = {
  key: fs.readFileSync('./key.pem'),
  cert: fs.readFileSync('./cert.pem')
};

var a = https.createServer(options, function (req, res) {
  res.writeHead(200);
  res.end("hello world\n");
}).listen(port, hostname, (err) => {
  if(err) console.error(err);
  console.log(`Server running at https://${hostname}:${port}/`);
});