'use strict';

class Person { 
	constructor(name) { this.name = name; } 
} 
class Employee extends Person { 
	constructor(name, organization) { 
    super(name);
		this.organization = organization;
	} 
	getInfo(){return `I'm ${this.name} from ${this.organization}`;} 
} 

let  john = new Employee("John", "IPT"); 
console.log(john.getInfo()); 