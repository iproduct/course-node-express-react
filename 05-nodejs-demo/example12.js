var dgram = require('dgram');
var message = new Buffer("Hello from UDP Client!");
var client = dgram.createSocket("udp4");
console.log("Client sending: " + message);
client.send(message, 0, message.length,
    12345, "localhost", function (err, bytes) {
        client.close();
    });