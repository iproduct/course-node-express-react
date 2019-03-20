const http = require('http');

const options = {
    hostname: 'localhost',
    port: 3000,
    path:'/',
};

const req = http.request(options, (res) => {
    console.log(`STATUS: ${res.statusCode}`);
    console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
    res.setEncoding('utf8');
    res.on('data', chunk => {
        console.log(`BODY: ${chunk}`);
    });
    res.on('end', () => {
        console.log('RESPONSE END');
    });
});

req.on('error', err => {
    console.log(`ERROR: ${JSON.stringify(err)}`);
});

req.end();


