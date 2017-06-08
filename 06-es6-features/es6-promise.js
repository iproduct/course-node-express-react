var p1 = new Promise((resolve, reject) => {
  setTimeout(resolve, 1000, 'one');
});
var p2 = new Promise((resolve, reject) => {
  setTimeout(resolve, 2000, 'two');
});
var p3 = new Promise((resolve, reject) => {
  setTimeout(resolve, 3000, 'three');
});
// var p4 = new Promise((resolve, reject) => {
//   setTimeout(resolve, 4000, 'four');
// });
// var p3 = new Promise((resolve, reject) => {
//   setTimeout(()=> reject('rejected'), 3000, 'three');
// });

Promise.all([p1, p2, p3])
.then(values => console.log('Success:', values))
.catch( reason => console.log('Error:', reason) )
.then( () => console.log('Demo finished'));
