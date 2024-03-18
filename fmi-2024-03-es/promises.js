
function messageAfterTimeout(prefix, who, timeout) {
    return new Promise((resolve, reject) => {
        setTimeout(() => Math.random() >= 0 ?
            resolve(`${prefix}: Hello ${who}`)
            : reject('Error resolving promise')
            , timeout);
    });
}

console.log('Demo started.')
messageAfterTimeout('', 'Trayan', 1000)
    .then(msg => {
        console.log('After 1000 ms:', msg);
        // return messageAfterTimeout(msg, 'Hristo', 2000)
        // return Promise.resolve('First then result');
        throw 'First then error';
    })
    .catch(err => {
        console.log("Caught in catch:", err);
        return 'First catch value';
    }).then(val => {
        console.log('In second then:', val);
        return 'Second then value';
    }).catch(err => console.log('In second catch:', err))
    .finally(() => console.log('Demo complete finally:', val))
