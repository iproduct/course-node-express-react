var http = require('http');
var fs = require('fs');

const PORT = 8000;

var server = http.createServer(function (req, res) {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    // res.end(new Date() + '\n');
    var stream = fs.createReadStream(__dirname + '/page1.html');
    stream.pipe(res);
});
server.listen(PORT);

console.log('Server running on port %s', PORT);