import {promises as dns} from 'dns' // const dns=require('dns')

const domain = 'yahoo.com'
dns.resolve(domain).then((addresses) => {
    console.log(`Addresses for ${domain}: ${JSON.stringify(addresses)}`)
    addresses.map(addr => dns.reverse(addr).then(hostnames => {
        console.log(`reverse ${addr} => ${JSON.stringify(hostnames)}`)
    }))
}).catch(err => console.error(err))