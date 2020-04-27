// process.env.foo = 'bar';
console.log(process.env.foo);

// print process.argv
process.argv.forEach((val, index) => {
    console.log(`${index}: ${val}`);
});