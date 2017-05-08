'use strict';

const irc = require('irc');
const readline = require('readline');


const CHANNEL = '#my_node_channel';

const rl = readline.createInterface(process.stdin, process.stdout);

rl.setPrompt(`${CHANNEL}> `);

var client = new irc.Client('irc.freenode.net', 'nodeBot', {
  channels: [CHANNEL]
});

client.on('error', function (message) {
  console.error('error: ', message);
});

client.on('connect', function () {
  console.log('connected to the irc server');
  client.join(CHANNEL, () => {
    client.say(CHANNEL, `I'm HappiBot my user is Trayan`);
    readMessage(client);
  });

});

client.on('message', function (from, to, message) {
  console.log(from + ' => ' + to + ': ' + message);
});

function readMessage(client) {
    rl.prompt();

    rl.on('line', (line) => {
      switch (line.trim()) {
        case 'quit':
        case '.exit':
          console.log('Exiting chat.');
          process.exit(0);
          break;
        default:
          client.say(CHANNEL, line.trim());
          break;
      }
      rl.prompt();
    }).on('close', () => {
      console.log('Have a great day!');
      process.exit(0);
    });
  }