'use strict';

//Singleton Design Pattern
var SingletonService = (function () {
  //config: an object containing service configuration
  function SingletonService({url, maxFetchItems} = { url:'http://acme.com/api', maxFetchItems: 100 }) {
    this.url = url;
    this.maxFetchItems = maxFetchItems;
  }

  SingletonService.prototype.toString = function () {
    return "SingletonService(url: " + this.url + ", maxFetchItems: " + this.maxFetchItems + ")";
  }

  var theInstance;

  return {
    getInstance: function (config) {
      if (theInstance === undefined) {
        theInstance = new SingletonService(config);
      }
      return theInstance;
    }
  };
}) ();

var singletonInstance1 = SingletonService.getInstance();
console.log(singletonInstance1.toString()); 

var singletonInstance2 = SingletonService.getInstance({url: 'http://other.com/rest', maxFetchItems: 500});
console.log(singletonInstance2.toString());

singletonInstance2.maxFetchItems = 300;
console.log(singletonInstance2.toString());
console.log(singletonInstance2.toString()); 