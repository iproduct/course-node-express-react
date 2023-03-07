
var triangle = { a: 1, b: 2, c: 3 };

var coloredTriangle = Object.create(triangle, {
  color: {
    value: 'blue',
    writable: true,
    enumerable: true,
    configurable: true
  },
  name: {
    value: 'triangle',
    writable: true,
    enumerable: true,
    configurable: true
  },
});

// console.log(coloredTriangle.color);

for (var prop in coloredTriangle) {
  if (coloredTriangle.hasOwnProperty(prop)) {
    console.log('coloredTriangle.' + prop + ' = ' + coloredTriangle[prop]);
  }
}
