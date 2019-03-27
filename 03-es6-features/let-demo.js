const callbacks = []
for (let i = 0; i <= 2; i++) {
    callbacks[i] = function () { return i * 2 }
}

// var callbacks = [];
// for (var i = 0; i <= 2; i++) {
//     (function (a) {
//         callbacks[a] = function() { return a * 2; };
//     })(i);
// }

callbacks.forEach(c => console.log(c()));

