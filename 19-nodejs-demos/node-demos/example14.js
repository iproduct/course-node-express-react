var readline = require('readline');
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
rl.question("What do you think of node.js? ",
    function (answer) {
        console.log("Thank you for your feedback:", answer);
        rl.close();
    });