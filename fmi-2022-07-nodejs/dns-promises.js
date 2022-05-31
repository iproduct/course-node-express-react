const dnsPromises = require('dns').promises;

(async function main() {
    try {
        const addresses = await dnsPromises.resolve4('yahoo.com');
        console.log(addresses);
        addresses.forEach(async (addr) => {
            const hostnames = await dnsPromises.reverse(addr);
            console.log(`Address [${addr}] => ${JSON.stringify(hostnames)}`);
        });
    } catch(err) {
        console.log(err);
    }
}) (); // IIFE
