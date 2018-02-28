var fibonacci = {
  [Symbol.iterator]: function*() {
    var pre = 0,
      cur = 1;
    for (let i = 0; i < 15; i++) {
      var temp = pre;
      pre = cur;
      cur += temp;
      if (cur < 1000) yield cur;
    }
  }
};

for (var n of fibonacci) {
  // truncate the sequence at 1000
  console.log(n);
}
