var irc = require('irc');
var client = new irc.Client('irc.freenode.net', 'nodeBot', {
  channels: ['#node_channel']
});

client.on('error', function (message) {
  console.error('error: ', message);
});

client.on('connect', function () {
  console.log('connected to the irc server');
});

client.on('message', function (from, to, message) {
  console.log(from + ' => ' + to + ': ' + message);
});

setTimeout(function () {
  client.join('#node_channel');
  client.say('#node_channel', "I'm a bot!");
  setTimeout(function () {
    client.say('#node_channel', "SRSLY, I AM!");
    setTimeout(function () {
      client.part('#node_channel');
      process.exit(0);
    }, 10000);
  }, 10000);
}, 14000);