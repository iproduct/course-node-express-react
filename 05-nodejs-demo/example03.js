var irc = require('irc');
var client = new irc.Client('irc.freenode.net', 'my_bot3', {
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
    client.say('#node_channel', "Am a bot really!");
    setTimeout(function () {
      client.part('#node_channel');
      process.exit(0);
    }, 3000);
  }, 5000);
}, 10000);