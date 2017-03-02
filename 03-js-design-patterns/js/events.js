var eventable = function(that) {
    var registry = {};
    that.fire = function(event){
        var array, func, handler, i, 
            type = typeof event ==='string' ? event: event.type;
        if(registry.hasOwnProperty(type)){
            array = registry[type];
            for(i=0; i < array.length; i++){
                handler=array[i];
                func = handler.method;
                if(typeof func === 'string'){
                    func = this[func];
                }
                func.apply(this, handler.parameters || [event]);
            }
        }
        return this;        
    };
    
    that.on = function (type, method, parameters) {
        var handler = {
            method: method,
            parameters: parameters
        };
        if (registry.hasOwnProperty(type)){
            registry[type].push(handler);
        } else {
            registry[type] = [handler];
        }
        return this;
    };
    return that;
};

