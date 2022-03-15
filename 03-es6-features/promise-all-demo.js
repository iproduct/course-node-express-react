
(function() {
  var p1 = new Promise((resolve, reject) => {
    setTimeout(resolve, 1000, 'one');
  });
  var p2 = new Promise((resolve, reject) => {
    setTimeout(resolve, 2000, 'two');
  });
  var p3 = new Promise((resolve, reject) => {
    setTimeout(resolve, 3000, 'three');
  });
  var p4 = new Promise((resolve, reject) => {
    setTimeout(resolve, 4000, 'four');
  });
  var p5 = new Promise((resolve, reject) => {
    setTimeout(reject, 990, 'reject for reason');
  });

  // Promise.all([p1, p2, p3, p4, p5]).then(values => { 
  //   console.log(values);
  // }).catch( reason => {
  //   console.log(`Rejected in second then clause: ${reason}`)
  // });

  // You can also use .catch
  Promise.race([p1, p2, p3, p4, p5]).then(value => {
    console.log(value);
    return value;
  }).catch(reason => {
    console.log(reason);
    throw `Retrown from catch: ${reason}`;
  }).then(v => {
    console.log(`Resolved in second then clause: ${v}`);
  }, r => {
    console.log(`Rejected in second then clause: ${r}`);
  }).finally(() => {
    console.log(`Demo finished.`);
  });

}) ();7