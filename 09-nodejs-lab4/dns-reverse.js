var dns = require('dns');

dns.resolve4('yahoo.com', function (err, addresses) {
    if (err) throw err;

    console.log('addresses: ' + JSON.stringify(addresses));

    addresses.forEach(function (a) {
        dns.reverse(a, function (err, domains) {
            if (err) { throw err; }
            console.log('reverse for ' + a + ': ' +
                JSON.stringify(domains));
        });
    });
});