import * as dns from 'dns';  //const dns = require('dns');

const domain = 'yahoo.com';
dns.resolve(domain, (err, addresses) => {
    // console.log(addresses);
    addresses.forEach(addr => dns.reverse(addr, (err, domains) => {
        console.log(addr, ' -> ', domains)
    }
    ))
})