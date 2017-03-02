'use strict';

// Class constructor function
function Employee(aName, aPractice) {
  aPractice = aPractice || 0;
  this.name = aName;
  this.practice = aPractice;
  // this.toString = function() {
  //   return this.name + ', practice: ' + this.practice;
  // };
}

Employee.prototype.toString = function () {
  return this.name + ', years: ' + this.practice;
};

var e1 = new Employee('Ivan');
var e2 = new Employee('Petar', 5);
// element.innerHTML += '<p>' + e1 + '</p><p>' + e2 + '</p>';


// Homework: Create Programmer constructor extending Employee with multivalued property 
// 'languages' and override toString method from Employee to print additional information 
// - programming languages for the programmer instance.

function Programmer(aName, aPractice, languages) {
  Employee.call(this, aName, aPractice); // base constructor
  this.languages = languages;
}

Programmer.prototype = Object.create(Employee.prototype);
Programmer.prototype = new Employee(); // alternative
Programmer.prototype.constructor = Programmer;
Programmer.prototype.supper = Employee.prototype;

//polymorphic toString
Programmer.prototype.toString = function () {
  return this.supper.toString() + ', languages: ' + this.languages;
}

var p1 = new Programmer('Ivan Petrov', 5, ['JavaScript', 'Scala', 'TypeScript']);
console.log(p1);



