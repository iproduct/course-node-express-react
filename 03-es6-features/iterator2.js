// let iterable = [10, 20, 30];

// for (let value of iterable) {
//   console.log(value);
// }

// let iterable = "boo";

// for (let value of iterable) {
//   console.log(value);
// }

let fibonacci = {
  [Symbol.iterator]() {
    let pre = 0, cur = 1, index = 0;
    return {
      next() {
        [pre, cur] = [cur, pre + cur];
        index++;
        return { done: cur > 1000, value: cur };
      }
    }
  }
}

for (var n of fibonacci) {
  console.log(n);
}