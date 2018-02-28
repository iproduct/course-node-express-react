
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

  

  Promise.all([p1, p2, p3, p4, p5]).then(values => { 
    console.log(values);
  }, reason => {
    console.log(reason)
  });


  // You can also use .catch
  Promise.race([p1, p2, p3, p4, p5]).then(values => {
    console.log(values);
    return values;
  }).catch(reason => {
    console.log(reason);
    return `Retrown from catch: ${reason}`;
  });
  // .then(v => {
  //   console.log(`Resolved in second then clause: ${v}`);
  // }, r => {
  //   console.log(`Rejected in second then clause: ${r}`);
  // });

}) ();