/**
 * Demonstartes the use of prototypical inheritance
 */

// Example of true prototypical inheritance style
// in JavaScript.

//var CONSOLE = true;

function test() {
	// "ex nihilo" object creation using the literal
	// object notation {}.
	var foo = {
		name : "foo",
		one : 1,
		two : 2
	};

	// Another "ex nihilo" object.
	var bar = {
		two : "two",
		three : 3
	};

	// Gecko and Webkit JavaScript engines can directly
	// manipulate the internal prototype link.
	// For the sake of simplicity, let us pretend
	// that the following line works regardless of the
	// engine used:
	bar.__proto__ = foo; // foo is now the prototype of bar.

	// If we try to access foo's properties from bar
	// from now on, we'll succeed.
	log(bar.one) // Resolves to 1.

	// The child object's properties are also accessible.
	log(bar.three) // Resolves to 3.

	// Own properties shadow prototype properties
	log(bar.two); // Resolves to "two"
	log(foo.name); // unaffected, resolves to "foo"
	log(bar.name); // Resolves to "foo"
}

