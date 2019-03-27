const express = require('express');
const app = express();
const path = require('path');
const http = require('http').Server(app);
const io = require('socket.io')(http, {transports:	['websocket', 'polling']});
const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
})

io.on('connection', function(socket) {
    console.log("Client connected: " + socket.id);
    socket.on('chat message', function(msg) {
        console.log('Message received: ' + msg);
        io.emit('chat message', msg);
    })
})

http.listen(port, () => {
    console.log(`Chat server listening on port: ${port}`)
})