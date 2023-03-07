function PositionLogger(aPos) {
  var _position = aPos;
  var _positionsLog = [{ val: aPos }];
  this.initialPposition = aPos;
  Object.defineProperty(this, 'position', {
    get: function () {
      // console.log('get position called');
      return _position;
    },
    set: function (val) {
      _position = val;
      _positionsLog.push({ val: _position });
    },
    enumerable: true
  });

  this.getLog = function () { return _positionsLog; };
}

var pl1 = new PositionLogger(5);
console.log('Value: ' + pl1.position);
pl1.position += 20;
console.log('Value: ' + pl1.position);
pl1.position -= 10;
pl1.position += 50;
console.log('Value: ' + pl1.position);
console.log(pl1.positionsLog);

console.log(pl1.getLog());

for (var key in pl1) {
  if (pl1.hasOwnProperty(key)) {
    var val = pl1[key];
    console.log(key, '->', val);
  }
}