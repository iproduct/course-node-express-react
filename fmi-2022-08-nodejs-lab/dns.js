const { Resolver } = require('dns');
const resolver = new Resolver();
resolver.setServers(['8.8.8.8']);

// This request will use the server at 4.4.4.4, independent of global settings.
resolver.resolve4('yahoo.com', (err, addresses) => { // CPS
  console.log(`Addrssses: ${JSON.stringify(addresses)}`)
  addresses.forEach(addr => resolver.reverse(addr, (err, hostnames)=>{
      console.log(addr, "->", hostnames.join(", "))
  }));
});
