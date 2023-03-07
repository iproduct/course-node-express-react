'use strict'
var o = {
    name: 'My Object',
    log: function(message){
        temp = 42;
        console.log(this.name, temp);
        self=this;
        var internal = function() {
            console.log(message + ": '" + self.name + "'")
        }
        internal();
        var temp;
        var self;
    }
}


o.log('Test message');