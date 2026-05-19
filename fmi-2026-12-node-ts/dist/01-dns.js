const dns = require('dns');
const domain = 'yahoo.com';
function main(domain) {
    dns.resolve(domain, (err, addresses) => {
        if (err)
            throw err;
        console.log(`Addresses for ${domain}: ${JSON.stringify(addresses)}`);
    });
}
//# sourceMappingURL=01-dns.js.map