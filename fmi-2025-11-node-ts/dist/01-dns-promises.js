"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dns_1 = require("dns"); // const dns=require('dns')
const domain = 'yahoo.com';
dns_1.promises.resolve(domain).then((addresses) => {
    console.log(`Addresses for ${domain}: ${JSON.stringify(addresses)}`);
    addresses.map(addr => dns_1.promises.reverse(addr).then(hostnames => {
        console.log(`reverse ${addr} => ${JSON.stringify(hostnames)}`);
    }));
}).catch(err => console.error(err));
//# sourceMappingURL=01-dns-promises.js.map