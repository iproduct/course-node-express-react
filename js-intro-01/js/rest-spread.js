var a, b, rest;
[a, b] = [1, 2];
console.log(a); // 1
console.log(b); // 2

[a, b, , , ...rest] = [1, 2, 3, 4, 5, 6, 7];
console.log(a); // 1
console.log(b); // 2
console.log(rest); // [3, 4, 5]

({a, c} = {a:1, b:2, c:3});
console.log(a); // 1
console.log(c); // 2

// ES7 - not implemented in Firefox 47a01
// ({a, b, ...rest} = {a:1, b:2, c:3, d:4});

var a = [[1], [2], [3]];
var b = [ ...a, [4]];
var [, c] = a;
c.shift();

// b.shift().shift();

console.log('a=', a);
console.log('b=', b);

let fibonacci = {
  [Symbol.iterator]() {
    let pre = 0, cur = 1;
    return {
      next() {
        [pre, cur] = [cur, pre + cur];
        return { done: false, value: cur }
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