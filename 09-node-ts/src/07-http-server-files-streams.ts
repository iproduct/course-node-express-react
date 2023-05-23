import * as http from 'http';
import * as fs from 'fs';
import * as oppressor from 'oppressor';

 

const HOSTNAME = 'localhost';
const PORT = 9000;

var server = http.createServer(function (req, res) {
    fs.createReadStream(__dirname + '/../public/index.html').pipe(oppressor(req)).pipe(res);
});
server.listen(PORT, HOSTNAME, ()=>{
    console.log(`HTTP Server listeneing on: http://${HOSTNAME}:${PORT}`);
})


server.on('error', err => console.error(`Server Error: ${err}`));
server.on('clientError', err => console.error(`Client Error: ${err}`));