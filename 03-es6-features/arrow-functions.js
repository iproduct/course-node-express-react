'use strict';

var bob = {
    name: "Bob",
    friends: ["Alice", "Jane"],
    printFriends() {
      // var self = this
      // this.friends.forEach((function(friend) { console.log(this.name + " knows " + friend) }).bind(this));
      // this.friends.forEach((function(friend) { console.log(self.name + " knows " + friend) }));
      this.friends.forEach( friend => console.log(this.name + " knows " + friend) );
    }
  }
  bob.printFriends();