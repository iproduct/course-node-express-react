process.stdin.on('readable', function () {
    var buf = process.stdin.read();
    console.dir(buf);
});