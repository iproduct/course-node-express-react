var http = require('http');
var fs = require('fs');

const PORT = 8000;

var server = http.createServer(function (req, res) {
    fs.readFile(__dirname + '/data.txt', function (err, data) {
        res.end(data);
    });
});
server.listen(PORT);

console.log('Server running on port %s', PORT);