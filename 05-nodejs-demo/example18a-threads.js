const http = require('http');
const url = require('url');
const assert = require('assert');
const { EventEmitter } = require('events');
const {
  Worker, isMainThread, parentPort, threadId, workerData, MessageChannel, MessagePort
} = require('worker_threads');

const port = 8100;

EventEmitter.defaultMaxListeners = 15;

if (isMainThread) {
  console.log(`Master ${process.pid} is running`);
  console.log(`Master ThreadId: ${threadId}`);

  // Keep track of http requests
  var numReqs = 0;
  setInterval(() => {
    console.log('numReqs =', numReqs);
  }, 4000);

  // Count requests
  function messageHandler(msg) {
    console.log(`Message handled by: ${JSON.stringify(msg)}`);
    if (msg.cmd && msg.cmd == 'notifyRequest') {
      numReqs += 1;
    }
  }

  // Start workers and listen for messages containing notifyRequest
  const numCPUs = require('os').cpus().length;
  console.log(`Num CPUs: ${numCPUs}`);
  for (var i = 0; i < numCPUs; i++) {
    const worker = new Worker(__filename, {workerData: {port: port + i, message: `Hello from WebServer ${i} on port ${port + i}`} });
    worker.on('message', messageHandler);
    worker.on('error',err => console.error(err));
    worker.on('exit', (code) => {
      if (code !== 0)
        console.error(new Error(`Worker stopped with exit code ${code}`));
    });
    const subChannel = new MessageChannel();
    worker.postMessage({ hereIsYourPort: subChannel.port1 }, [subChannel.port1]);
    subChannel.port2.on('message', messageHandler);
  }

} else {
  parentPort.on('message', (value) => {
    assert(value.hereIsYourPort instanceof MessagePort);
    const myParentPort = value.hereIsYourPort;
    console.log(`${threadId}: received parentPort: ${JSON.stringify(myParentPort)}`)
    myParentPort.postMessage(`The worker Id: ${threadId} is sending this.`);
    
    // Worker processes have a http server.
    http.Server((req, res) => {
      var pathname = url.parse(req.url).pathname;
      console.log("\nRequest for " + pathname + " received.");
      console.log(`Request method: ${req.method}`);
      // console.log(`Headers ${JSON.stringify(req.headers)}`);

      res.writeHead(200);
      res.end(workerData.message);

      // notify master about the request
      const message = { cmd: 'notifyRequest', workerId: threadId, isMain: isMainThread};
      console.log(message);
      // myParentPort.postMessage(message);
      parentPort.postMessage(message);
    }).listen(workerData.port);
  });

}