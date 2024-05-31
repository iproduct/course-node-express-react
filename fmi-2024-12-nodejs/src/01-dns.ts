import * as dns from 'dns';

const domain  = 'yahoo.com';

dns.resolve(domain, (err, addresses) => {
    console.log(addresses);
})