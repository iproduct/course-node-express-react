let fibonacci = {
  [Symbol.iterator]: function() {
    let pre = 0, cur = 1;
    return {
      next() {
        [pre, cur] = [cur, pre + cur];
        return { value: cur }
      }
    }
  }
}

for (var n of fibonacci) {
  // truncate the sequence at 1000
  if (n > 1000)
    break;
  console.log(n);
}

for (var n of fibonacci) {
  // truncate the sequence at 1000
  if (n > 2000)
    break;
  console.log(n);
}