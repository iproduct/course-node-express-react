import * as dns from 'dns' // const dns=require('dns')

const domain = 'yahoo.com'
dns.resolve(domain, (err, addresses) => {
    if(err) throw err;
    console.log(`Addresses for ${domain}: ${JSON.stringify(addresses)}`)
    addresses.map(addr => dns.reverse(addr, (err, hostnames) => {
        if(err) throw err
        console.log(`reverse ${addr} => ${JSON.stringify(hostnames)}`)
    }))
})