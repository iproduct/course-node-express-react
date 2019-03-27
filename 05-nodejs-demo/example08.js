var http = require('http');
var fs = require('fs');

const PORT = 8080;

var server = http.createServer(function (req, res) {
    var stream = fs.createReadStream(__dirname + '/data.txt');
    stream.pipe(res);
});
server.listen(PORT);

console.log('Server running on port %s', PORT);