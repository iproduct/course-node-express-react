var irc = require('irc');
var readline = require('readline');
var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});


var client = new irc.Client('irc.freenode.net', 'my_bot6', {
  channels: ['#node_channel']
});

client.on('error', function (message) {
  console.error('error: ', message);
});

client.on('connect', function () {
  console.log('connected to the irc server');
  client.join('#node_channel', () => {
    question();
  });
});

client.on('message', function (from, to, message) {
  console.log(from + ' => ' + to + ': ' + message);
});


let message = '';

const question = () => {
  rl.question("> ", (answer) => {
    console.log("To send:", answer);
    client.say('#node_channel', answer);
    if(answer !== '.exit') question();
    else  {
      rl.close();
      process.exit(0);
    }
  });
};





// setTimeout(function () {
//   client.join('#node_channel');
//   client.say('#node_channel', "I'm a bot!");
//   setTimeout(function () {
//     client.say('#node_channel', "SRSLY, I AM!");
//     setTimeout(function () {
//       client.part('#node_channel');
//       process.exit(0);
//     }, 10000);
//   }, 10000);
// }, 14000);