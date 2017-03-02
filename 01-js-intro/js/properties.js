
var triangle = { a: 1, b: 2, c: 3 };

function ColoredTriangle() {
  this.color = 'blue';
}

ColoredTriangle.prototype = triangle;

var obj = new ColoredTriangle();

for (var prop in obj) {
  if (obj.hasOwnProperty(prop)) {
    console.log('obj.' + prop + ' = ' + obj[prop]);
  }
}
