'use strict';

// Design Pattern Mixin

// Car Class
function Car(model = 'no model provided', year = 'no years provided', miles = 'no miles provided') {
    this.model = model;
    this.year = year;
    this.miles = miles;
    //        this.toString = function(){
    //            return this.model + " has done " + this.miles + " miles";
    //        };
}
Car.prototype.toString = function () {
    return '[' + this.model + ', year: ' + this.year + ', miles: ' + this.miles + ']';
};


// Car Unility Mixin Class
function CarUtilityMixin() { };
CarUtilityMixin.prototype = {
    isNew: function () {
        return this.year >= 2015 && this.miles < 50000
    },
    getMilesPerYear: function () {
        var yearNow = (new Date()).getFullYear();
        return this.miles / (yearNow - this.year) || this.miles;
    }
};

// Mixin second class methods to first one if they dont exist
function mixin(receivingClass, givingClass) {
    if (arguments[2]) { // optional third argument - array of methods to mixin
        Array.of(arguments).forEach(
            method => receivingClass.prototype[method] = givingClass.prototype[method]
        );
    } 
    else { // copy all methods
        for (var method in givingClass.prototype) {
         // check to make sure the receiving class doesn't have a method 
         // with the same name as the one currently being processed
            if (givingClass.prototype.hasOwnProperty(method)
                && !receivingClass.prototype[method]) {
                receivingClass.prototype[method] = givingClass.prototype[method];
            }
        }
    }
}


// Test it
var astra = new Car("Opel Astra", 2012, 75000);
var mondeo = new Car("Ford Mondeo", 2015, 15000);

console.log(astra.toString());
console.log(mondeo.toString());


// Mixin utility methods to Car class
mixin(Car, CarUtilityMixin);

// Show test results
console.log(astra + ' is new? : ', astra.isNew());
console.log(astra + ' miles per year: ', astra.getMilesPerYear());
console.log(mondeo + ' is new? : ', mondeo.isNew());
console.log(mondeo + ' miles per year: ', mondeo.getMilesPerYear());




