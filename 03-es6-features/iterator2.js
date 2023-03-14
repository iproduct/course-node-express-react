// let iterable = [10, 20, 30];

// for (let value of iterable) {
//   console.log(value);
// }

// let iterable = "boo";

// for (let value of iterable) {
//   console.log(value);
// }

let fibonacci = (numValues) => ({
  [Symbol.iterator]() {
    let pre = 0, cur = 1, index = 0; // Enclosing scope = closure
    return {
      next() {
        [pre, cur] = [cur, pre + cur];
        index++;
        return { done: index > numValues, value: [index, cur] };
      }
    }
  }
})

for (var [i, n] of fibonacci(10)) {
  console.log(i, '->', n);
}

// for (var [i, n] of fibonacci(30)) {
//   console.log(i, '->', n);
// }

console.log(...fibonacci(10));