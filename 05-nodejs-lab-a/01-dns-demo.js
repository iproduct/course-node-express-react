var dns = require('dns');

dns.resolve4('google.com', function (err, addresses) {
   if (err) throw err;
   console.log('addresses: ' + JSON.stringify(addresses));
   addresses.forEach(addr => {
     dns.reverse(addr, (err, domains) => {
       if(err) throw err;
       console.log(`Reverse is: ${JSON.stringify(domains)}`);
     });
   });
});
