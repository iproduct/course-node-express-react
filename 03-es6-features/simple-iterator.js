let range = {
    [Symbol.iterator]: () => {
        let nextVal = 0;
        return {
            next() {
                return {value: nextVal++, done: nextVal > 10}
            }
        }
    }
}

for(const v of range)  {
    console.log(v);
}

for(const v of range)  {
    console.log(v);
}