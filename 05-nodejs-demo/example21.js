'use strict';

/**
 * TCP demo - exposing REPL shell using TCP socket
 */

const net = require('net');
const repl = require('repl');
const PORT = 5000;
var connections = 0;

// Configure REPL server over TCP
let server = net.createServer((socket) => {
    connections += 1;
    console.log("New connection received. Total connections: " + connections);
    var replServer = repl.start({
        prompt: 'Node.js via TCP socket> ',
        input: socket,
        output: socket
    });

    // Close TCP socket on exit
    replServer.on('exit', () => {
        socket.end();
    });

    // Define two custom commands
    replServer.defineCommand('sayhello', {
        help: 'Say hello - usage: .sayhello <name>',
        action: function (name) {
            this.lineParser.reset();
            this.bufferedCommand = '';
            this.output.write(`Hello, ${name}!\n`);
            this.displayPrompt();
        }
    });
    replServer.defineCommand('saybye', function () {
        this.output.write('Goodbye!\n');
        this.close();
    });

    //Handle REPL server errors
    replServer.on('error', (err) => {
        console.log(err.stack);
    });
});

// Handle server errors
server.on('error', (err) => {
    console.log(err.stack);
});

// Start listening for incoming connections
server.listen(PORT, () => {
    console.log(`TCP REPL shell available on port ${PORT}`);
});

