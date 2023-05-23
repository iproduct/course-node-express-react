import * as dns from 'dns'; // const dns = require('dns')
import { hostname } from 'os';
const domain = 'yahoo.com';
dns.resolve(domain, (err, addresses) => {
    if(err) throw err;
    console.log(`Addresses for domain '${domain}':\n${addresses.join('\n')}`);
    addresses.map(addr => dns.reverse(addr, (err, hostnames) =>{
        if(err) throw err;
        console.log(`Reverse for ${addr}: ${JSON.stringify(hostnames)}`);
    }))
});