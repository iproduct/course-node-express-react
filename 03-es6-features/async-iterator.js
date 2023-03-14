let asyncFibonacci = {
    [Symbol.asyncIterator]: function () {
        let pre = 0, cur = 1; // index = 0;
        return {
            async next() {
                [pre, cur] = [cur, pre + cur];
                // index ++;
                return new Promise((resolve, reject) => setTimeout(resolve, 500, { value: cur }));
            }
        }
    }
};

(async () => {
    for await (const n of asyncFibonacci) {
        // truncate the sequence at 1000
        if (n > 1000)
            break;
        console.log(n);
    }
})()

// const asyncIter = asyncFibonacci[Symbol.asyncIterator]();
// asyncIter.next().then(v1 => console.log(v1))
// asyncIter.next().then(v1 => console.log(v1))
// asyncIter.next().then(v1 => console.log(v1))
// asyncIter.next().then(v1 => console.log(v1))
// asyncIter.next().then(v1 => console.log(v1))
// asyncIter.next().then(v1 => console.log(v1))
// asyncIter.next().then(v1 => console.log(v1))

