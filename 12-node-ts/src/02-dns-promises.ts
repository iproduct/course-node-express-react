import * as dns from 'dns/promises'; // const dns = require('dns')
import { hostname } from 'os';
const domain = 'yahoo.com';
(async () => {
    try {
        const addresses = await dns.resolve(domain);
        addresses.map(async (addr) => {
            const hostnames = await dns.reverse(addr);
            console.log(`Reverse for ${addr}: ${JSON.stringify(hostnames)}`);
        });
    } catch (err) {
        throw (err);
    }
}) (); //IIFE