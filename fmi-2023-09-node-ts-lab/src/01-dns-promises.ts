import * as dns from 'dns/promises';

const domain  = 'yahoo.com';

dns.resolve(domain).then(addresses => {
    console.log(addresses);
})