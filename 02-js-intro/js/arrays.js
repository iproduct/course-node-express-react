
var i, copy;
var employees = [
  { name: 'John', age: 35 },
  { name: 'Bill', age: 45 },
  { name: 'Amy', age: 27 },
  { name: 'Ivan', age: 27 }
];

var person1 = {}; // prototyple
person1.name = 'Petar';
person1.age = 30;
person1.qualifications = ['javascript', 'react', 'TDD'];

var person2 = new Object(); // pseudo-classical
person2.name = 'Dimitar';
person2.age = 40;
person2.qualifications = ['C++', '.NET'];

employees.push(person1, person2);

// var copy = employees.slice(0);// shallow copy
var copy = JSON.parse(JSON.stringify(employees));// deep copy
console.log(copy);
console.log(copy[0] === employees[0]);

var result = employees.filter(
  function (employee) {
    return employee.age < 40;
  })
  .map((emp, index) => ({ name: emp.name.toUpperCase(), index, age: emp.age }))
  // .reduce( (accum, res) => accum + res.age, 0);
  .forEach((res) =>
    console.log(`${res.index} -> ${res.name}, ${res.age}`)
  );

console.log(result);



