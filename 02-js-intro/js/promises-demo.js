const p1 = new Promise((resolve) => { setTimeout(resolve, 3000, 'one'); });

const p2 = new Promise((resolve) => { setTimeout(resolve, 2000, 'two'); });

// const p3 = new Promise((resolve) => { setTimeout(resolve, 1000, 'three'); });

const p3 = new Promise((res, reject) => { setTimeout(error => reject(error), 1000, 'rejected'); });

Promise.race([p1, p2, p3])
    .then(v => console.log('Success:', v))
    .catch(err => {
        console.log('Error:', err);
        return new Promise((res, reject) => { setTimeout(error => reject(error), 3000, "Error thrown from catch"); });
    })
    .then(() => console.log('Demo finished'))
    .catch(err => console.log('Demo finished with error: ' + err));


