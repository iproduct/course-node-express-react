var http = require('http');
var fs = require('fs');

const PORT = 8080;

var server = http.createServer(function (req, res) {
    fs.readFile(__dirname + '/data.txt', function (err, data) {
        process.nextTick(() => console.log("First job done!"))
        console.log("Immediate");
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end(data);
    });
});
server.listen(PORT);

server.on('error', (err) => {
    console.error(`Got error ${err}`);
})

console.log('Server running on port %s', PORT);