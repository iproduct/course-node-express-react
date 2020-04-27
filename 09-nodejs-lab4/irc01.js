var irc = require('irc');
var client = new irc.Client('irc.freenode.net', 'my_bot_trayan', {
  channels: ['#course-node']
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

setTimeout(function () {
    client.join('#course-node');
    client.say('#course-node', "I'm a Trayan's bot!");
    setTimeout(function () {
      client.say('#course-node', "To chat is nice!");
    //   setTimeout(function () {
    //     client.part('#course-node');
    //     process.exit(0);
    //   }, 3000);
    }, 5000);
  }, 10000);