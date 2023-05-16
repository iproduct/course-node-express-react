"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dns = require("dns"); //const dns = require('dns');

const domain = 'yahoo.com';

dns.resolve(domain, (err, addresses) => {
    // console.log(addresses);
    addresses.forEach(addr => dns.reverse(addr, (err, domains) => {
        console.log(addr, ' -> ', domains);
    }));
});
//# sourceMappingURL=dns.js.map