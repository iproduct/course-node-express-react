var dns = require('dns');

dns.resolve4('google.com', function (err, addresses) {
if (err) throw err;

console.log('addresses: ' + JSON.stringify(addresses));
});

