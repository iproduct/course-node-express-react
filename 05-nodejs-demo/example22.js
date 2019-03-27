const net = require('net');
const readline = require('readline');
const PORT = 5000;
const rl = readline.createInterface(process.stdin, process.stdout);
  
// 'connect' listener
const client = net.connect({ port: PORT }, () => {
  console.log(`Connected to server port ${PORT}.`);

  rl.on('line', (line) => {
    switch (line.trim()) {
      case 'hello':
        console.log('world!');
        break;
      default:
        client.write(line + "\n" );
        break;
    }
    rl.prompt();
  }).on('close', () => {
    console.log('Have a great day!');
    process.exit(0);
  });

});

client.on('data', (data) => {
  process.stdout.write(data.toString());
});
client.on('error', (error) => {
  console.log(error);
});
client.on('end', () => {
  console.log('disconnected from server');
  process.exit(0);
});
