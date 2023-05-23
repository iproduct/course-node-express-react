import * as http from 'http';
import * as fs from 'fs';
 

const HOSTNAME = 'localhost';
const PORT = 9000;

var server = http.createServer(function (req, res) {
    fs.readFile(__dirname + '/../public/index.html', function (err, data) {
        if(err){
            console.error(err);
        }
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end(data);
    });
});
server.listen(PORT, HOSTNAME, ()=>{
    console.log(`HTTP Server listeneing on: http://${HOSTNAME}:${PORT}`);
})


server.on('error', err => console.error(`Server Error: ${err}`));
server.on('clientError', err => console.error(`Client Error: ${err}`));