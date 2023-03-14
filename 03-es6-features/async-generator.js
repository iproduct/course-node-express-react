var fibonacci = (numValues) => ({
  [Symbol.asyncIterator]: async function* () {
    var pre = 0,
      cur = 1;
    for (let i = 0; i < numValues; i++) {
      var temp = pre;
      pre = cur;
      cur += temp;
      yield new Promise((resolve, reject) => setTimeout(resolve, 500, cur));
    }
  }
});

async function* combinedAsyncGen(){
  yield 1;
  yield 2;
  yield 3;
  yield * fibonacci(10);
  yield * fibonacci(20);
}

(async function() {
  for await (const n of combinedAsyncGen()) {
    console.log(n);
  }
}) () // IIFE