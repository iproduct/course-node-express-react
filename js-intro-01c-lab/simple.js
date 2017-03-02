'use strict';

function test() {
  var employees = [
    { name: 'John', age: 35 },
    { name: 'Bill', age: 39 },
    { name: 'Amy', age: 27 },
    { name: 'Ivan', age: 27 }
  ];

  // printEmployees(employees);

  var person1 = {};
  person1.name = 'Petar';
  person1.age = 30;
  person1.qualifications = ['javascript', 'react', 'TDD'];

  var person2 = new Object();
  person2.name = 'Dimitar';
  person2.age = 40;
  person2.qualifications = ['C++', '.NET'];

  employees.push(person1, person2);

  var element = document.getElementById('results');


  // utility functions
  function stringifyEmployees(employees) {
    var i, markupResult = '<ul>';
    for (i = 0; i < employees.length; i++) {
      var currentEmp = employees[i];
      // var qualifications = currentEmp.qualifications || [];
      markupResult += `<li>${currentEmp.name} - ${currentEmp.age} 
      ${currentEmp.qualifications ? ': ' + currentEmp.qualifications.join(', ') : ''}</li>`;

      // console.log(i + ': ' + currentEmp.name + ' - ' + currentEmp.age);
    }
    markupResult += '</ul>';
    return markupResult;
  };

  element.innerHTML = stringifyEmployees(employees);


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

}


