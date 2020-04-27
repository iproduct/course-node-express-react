var dns=require('dns');

dns.resolve4('uni-sofia.bg', function(err, addresses) {
    if(err) throw err;
    console.log(`Addresses: ${JSON.stringify(addresses)}`);
})

dns.reverse('62.44.96.22', (err, hosts) => {
    if(err) throw err;
    console.log(`Hosts: ${JSON.stringify(hosts)}`);
});