var irc = require('irc');
var client = new irc.Client('irc.freenode.net', 'my_bot', {
  channels: ['#node_channel']
});

client.on('error', function(message) {
  console.error('error: ', message);
});

client.on('connect', function() {
  console.log('connected to the irc server');
});

client.on('message', function (from, to, message) {
  console.log(from + ' => ' + to + ': ' + message);
});



