function test() {
  var i, copy;
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
    
  // copy = employees.slice(0);// shallow copy
  copy = JSON.parse(JSON.stringify(employees));// deep copy

  employees[0].name= 'NEW NANE';


  var element = document.getElementById('results');
  for(i = 0; i < employees.length; i++)
    element.innerHTML += copy[i].name + ' - ' + copy[i].age + '<br>';
}


