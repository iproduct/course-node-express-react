function range(min, max, step) {

}


// Tests
for(const n of range(10)) { // logs 0 - 9
    console.log(n);
}

for(const n of range(5, 20)) { // logs 5 - 19
    console.log(n);
}

for(const n of range(20, 0, -1)) { //logs 20 - 1
    console.log(n);
}