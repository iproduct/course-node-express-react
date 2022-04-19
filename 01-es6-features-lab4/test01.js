function f({a, b = 0} = {a: "hi"}) { 	console.log(a, b); } 
f({})