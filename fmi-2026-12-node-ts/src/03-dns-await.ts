import { promises as dns } from 'dns' // const dns=require('dns')

const domain = 'yahoo.com';
(async () => {
    try {
        const addresses = await dns.resolve(domain)
        console.log(`Addresses for ${domain}: ${JSON.stringify(addresses)}`)
        addresses.map(async addr => {
            const hostnames = await dns.reverse(addr)
            console.log(`reverse ${addr} => ${JSON.stringify(hostnames)}`)
        })
    } catch (err) {
        console.error(err)
    }
})() // IIFE