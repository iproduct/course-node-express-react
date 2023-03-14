var fibonacci = (numValues) => ({
  [Symbol.iterator]: function*() {
    var pre = 0,
      cur = 1;
    for (let i = 0; i < numValues; i++) {
      var temp = pre;
      pre = cur;
      cur += temp;
      yield [i, cur];
    }
  }
});

for (var [i, n] of fibonacci(30)) {
  // truncate the sequence at 1000
  console.log(i, '->', n);
}
