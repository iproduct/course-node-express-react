// const dns: typeof import('dns') = require('dns');
import * as dns from 'dns';

const domain = 'yahoo.com';
function main(domain: string) {
    dns.resolve(domain, (err, addresses) => {
        if (err) throw err;
        console.log(`Addresses for ${domain}: ${JSON.stringify(addresses)}`);
        addresses.map(addr => dns.reverse(addr, (err, hostnames) => {
            if(err) throw err;
            console.log(`reverse ${addr} => ${JSON.stringify(hostnames)}`)
        }))
    })
}

main(domain)