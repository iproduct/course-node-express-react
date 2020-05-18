'use strict';

const countries = require('./countries');
const JsonToString = require('./transform1');
const AddNewLine = require('./transform2');
const MyWritable = require('./writable1').MyWritable;
const Readable = require('stream').Readable;

// console.log(countries);

class CountriesReadable extends Readable {
    constructor(options) {
        options = options || {objectMode: true};
        super(options);
        this.index = 0;
    }

    _read() {
        if (this.index >= countries.length) rs.push(null);
        setTimeout(() => {
            rs.push( countries[this.index ++]);
        }, 100);
    }

}

//lets test it
let rs = new CountriesReadable();

rs
// .pipe(new MyWritable());
.pipe(new JsonToString())
.pipe(new AddNewLine())
.pipe(process.stdout);

rs.on('error', process.exit);

process.on('exit', function () {
    console.error('\n_read() called ' + rs.index + ' times');
});

