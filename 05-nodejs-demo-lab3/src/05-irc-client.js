const irc = require('irc');
const {of, zip, interval} = require('rxjs');
const { map, tap, take } = require('rxjs/operators');

const client = new irc.Client('irc.freenode.net', 'my_bot44', {
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

setTimeout(function () {
  client.join('#node_channel');
  zip(of('I\'m a bot!', 'Am a bot really!', 'No joke!', 'Bye'),
    interval(1000)).pipe(
      take(2),
      map(([msg , num ]) => msg + ' ' + num),
      tap(msg => console.log(msg))
    ).subscribe(msg => client.say('#node_channel', msg));
}, 2000);