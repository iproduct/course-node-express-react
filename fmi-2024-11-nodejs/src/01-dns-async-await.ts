import * as dns from 'dns/promises';

const domain = 'yahoo.com';

(async () => {
    const addresses = await dns.resolve(domain)
    console.log(addresses);
})();