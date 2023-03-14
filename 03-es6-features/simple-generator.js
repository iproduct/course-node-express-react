let range = {
    *[Symbol.iterator]() {
        for (let nextVal = 0; nextVal < 10; nextVal++)
            yield nextVal;
    }
}

for (const v of range) {
    console.log(v);
}

for (const v of range) {
    console.log(v);
}