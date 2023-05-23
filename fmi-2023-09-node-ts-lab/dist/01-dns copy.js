"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dns = require("dns");
const domain = 'yaho0.com';
dns.resolve(domain, (err, addresses) => {
    console.log(addresses);
});
//# sourceMappingURL=01-dns%20copy.js.map