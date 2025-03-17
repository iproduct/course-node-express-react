let fibonacci = {
  [Symbol.iterator]: function () {
    return {
      pre: 0,
      cur: 1,
      next() {
        [this.pre, this.cur] = [this.cur, this.pre + this.cur];
        return { value: this.cur }
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