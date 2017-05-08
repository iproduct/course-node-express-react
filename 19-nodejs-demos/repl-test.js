// repl_test.js
const repl = require('repl');

repl.start('custom> ').context.m = 'message';