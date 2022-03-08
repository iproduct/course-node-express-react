function PositionLogger(aPos) {
  var position = aPos, positionsLog = [{ val: aPos }];
  // this.position = aPos;
  Object.defineProperty(this, 'position', {
    get: function () {
      // console.log('get position called');
      return position;
    },
    set: function (val) {
      position = val;
      positionsLog.push({ val: position });
    },
    enumerable: true
  });

  this.getLog = function () { return positionsLog; };
}

var pl1 = new PositionLogger(5);
console.log('Value: ' + pl1.position);
pl1.position += 20;
console.log('Value: ' + pl1.position);
pl1.position -= 10;
console.log('Value: ' + pl1.position);

var log = pl1.getLog();
console.log(JSON.stringify(log));

// for (var key in pl1) {
//   if (pl1.hasOwnProperty(key)) {
//     var val = pl1[key];
//     console.log(key, '->', val);
//   }
// }