import {promises as dns} from 'dns'

const domain = 'yahoo.com'
dns.resolve(domain).then((addresses) => {
    console.log(`Using Promises. Addresses for ${domain}: ${JSON.stringify(addresses)}`)
    addresses.map(addr => dns.reverse(addr).then(hostnames => {
        console.log(`reverse ${addr} => ${JSON.stringify(hostnames)}`)
    }))
}).catch(err => console.error(err))