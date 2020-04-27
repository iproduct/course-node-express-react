const irc = require('irc');
const Rx = require('rxjs');
const map = require('rxjs/operators').map;

const client = new irc.Client('irc.freenode.net', 'my_bot_trayan', {
  channels: ['#course-node']
});

client.on('error', function(message) {
  console.error('error: ', message);
});

client.on('connect', function() {
  console.log('connected to the irc server');
  client.join('#course-node');
  const s1 = Rx.interval(3000);
  const s2 = Rx.from(["I'm a Trayan's bot!", "To chat is nice!", "To chat OR not chat -", ' this is the question!', "BYE, BYE"]);
  Rx.zip(s1, s2).pipe(
     map(([n, message]) => message)
  ).subscribe(message => { //onNext
    console.log(message);
    client.say('#course-node', message);
  }, undefined, //onEror
   () => { // onClose
    console.log('Leaving the IRC chat ...');
    client.part('#course-node');
    setTimeout(() => process.exit(0), 3000);
  });  
});

client.on('message', function (from, to, message) {
  console.log(from + ' => ' + to + ': ' + message);
});

 