"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dns = require("dns/promises");
const domain = 'yahoo.com';
dns.resolve(domain).then(addresses => {
    console.log(addresses);
});
//# sourceMappingURL=01-dns-promises.js.map