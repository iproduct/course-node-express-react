function test() {
  'use strict';

  const employees = [
    new Employee('John Smith', 12, ['js', 'fortran', 'php']),
    new Employee('George Washigton', 5, ['js', 'node.js', 'express']),
    new Employee('Amanda Smith', 15, ['java', 'js', 'php']),
    new Employee('Simon Magroove', 3, ['php', 'html', 'php']),
    new Employee('Amy Harrioson'),
  ];

  // Employee constructor
  function Employee(aName, aPractice, qualifications) {
    this.name = aName;
    this.practice = aPractice || 0;
    this.qualifications = qualifications || [];
  }

  Employee.prototype.toString = function () {
    return this.name + ', years: ' + this.practice + ', qualifications: ' + this.qualifications.join(', ');
  };

  const element = document.getElementById('results');

  element.innerHTML = employees
    .sort((e1, e2) => {
      let n1 = e1.name.toLowerCase();
      let n2 = e2.name.toLowerCase();
      return n1 > n2 ? 1 : n1 < n2 ? -1 : 0;
    }).reduce( (acc, emp) => acc + emp + '<br>', '');
 
}