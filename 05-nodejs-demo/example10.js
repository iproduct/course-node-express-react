var http = require('http');
var fs = require('fs');
var oppressor = require('oppressor');

const PORT = 8080;

var server = http.createServer(function (req, res) {
    // res.writeHead(200, { 'Content-Type': 'text/html' });
    // res.end(new Date() + '\n');
    var stream = fs.createReadStream(__dirname + '/page1.html');
    stream.pipe(oppressor(req)).pipe(res);
});
server.listen(PORT);

console.log('Server running on port %s', PORT);