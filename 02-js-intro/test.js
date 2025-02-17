function f({a, b = 0} = {a: "!"}) { return [a, b] } 


console.log([f({a: "ok"}), f(), f({})]);