function msgAfterTimeout(msg, who, timeout) {
    return new Promise((resolve, reject) => {
        setTimeout(() =>
            // Math.random() > 0.5 ?
                resolve(`${msg} Hello ${who}!`)
                // : reject(`Error resolving promise: ${who}`)
            , timeout)
    })
}

msgAfterTimeout("", "Trayan", 1000).then(
    msg => {
        console.log(`done after 1000ms:${msg}`);
        return msgAfterTimeout(msg, "Georgi", 2000)
        // throw msg + "Bar";
    }
)
// .catch(err => console.log("Error:", err))
.then((msg) => {
    console.log(`done after 3000ms:${msg}`);
    return Promise.reject("Demo finished");
})
.then(msg => console.log(msg))
.catch( err => {
    console.log('Error: ' + err);
    throw 'After finish';
})
.then(
    msg => console.log(msg), //Success
    err => console.log('Error 2: ' + err) //Error
)
.finally(() => console.log("In finally"));