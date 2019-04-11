const cluster = require('cluster');
const http = require('http');
const url = require('url');

if (cluster.isMaster) {
  console.log(`Master ${process.pid} is running`);

  // Keep track of http requests
  var numReqs = 0;
  setInterval(() => {
    console.log('numReqs =', numReqs);
  }, 4000);

  // Count requests
  function messageHandler(msg) {
    if (msg.cmd && msg.cmd == 'notifyRequest') {
      console.log(`Message handled by: ${JSON.stringify(msg)}`);
      numReqs += 1;
    }
  }

  cluster.on('listening', (worker, address) => {
    console.log(
      `A worker Id ${worker.id} is now connected to ${address.address}:${address.port}`);
  });

  // Start workers and listen for messages containing notifyRequest
  const numCPUs = require('os').cpus().length;
  console.log(`Num CPUs: ${numCPUs}`);
  for (var i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  Object.keys(cluster.workers).forEach((id) => {
    cluster.workers[id].on('message', messageHandler);
  });

} else if (cluster.isWorker) {

  // Worker processes have a http server.
  http.Server((req, res) => {
    var pathname = url.parse(req.url).pathname;
    console.log("\nRequest for " + pathname + " received.");
    console.log(`Request method: ${req.method}`);
    // console.log(`Headers ${JSON.stringify(req.headers)}`);

    res.writeHead(200);
    res.end(`hello world from worker ${cluster.worker.id} \n`);

    // notify master about the request
    process.send({ cmd: 'notifyRequest', workerId:cluster.worker.id, workerPid: process.pid, isMasterProcess: cluster.isMaster});
  }).listen(8080);
}