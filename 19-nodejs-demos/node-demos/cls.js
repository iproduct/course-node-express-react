const repl = require('repl');

var replServer = repl.start({prompt: '> '});
replServer.defineCommand('cl', {
  help: 'Clear screen',
  action: function(name) {
    this.lineParser.reset();
    this.bufferedCommand = '';
    process.stdout.write('\u001B[2J\u001B[0;0f');
    this.displayPrompt();
  }
});