var triangle = { a: 1, b: 2, c: 3 };

function ColoredTriangle() {
    this.color = 'red';
    this.size = 12;
}

Object.defineProperty( triangle, "name", {
    value: "Triangle1",
    writable: false,  enumerable: true,  configurable: true
});


ColoredTriangle.prototype = triangle;
ColoredTriangle.prototype.toString = function() {
    return `Triangle [${this.color}], size=${this.size}`;
};

function test() {
    obj = new ColoredTriangle();
    console.log(obj.toString());
    console.log(Object.keys(triangle))

    for (const prop in obj) {
        // if (obj.hasOwnProperty(prop)) {
            console.log(`obj.${prop} = ${obj[prop]}`);
        // }
    }
    const arr = ["a","b","c",4,5,6,7,8,9];
    for (const key in arr){
        console.log(`arr.${key} = ${arr[key]}`);
    }
    for (const val of arr){
        console.log(`${val}`);
    }
}

// console.log("Global obj =", obj)
test()
