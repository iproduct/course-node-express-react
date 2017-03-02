'use strict';

// Eventable class
function Eventable() {
    this.registry = {};
}

Eventable.prototype.fire = function (event) {
    var handlers, callback, eventHandler, i,
        eventType = typeof event === 'string' ? event : event.type;
    if (this.registry.hasOwnProperty(eventType)) {
        handlers = this.registry[eventType];
        for (i = 0; i < handlers.length; i++) {
            eventHandler = handlers[i];
            callback = eventHandler.callback;
            if (typeof callback === 'string') {
                callback = eventHandler.context[callback]; // if method name is provided instead of function
            }
            // call each handler back with provided parameters or event as single parameter
            callback.apply(eventHandler.context, eventHandler.parameters || [event]);
        }
    }
    return this;
};

Eventable.prototype.on = function (eventType, callback, callbackThisContext, parameters) {
    var eventHandler = {
        context: callbackThisContext,
        callback: callback,
        parameters: parameters
    };
    if (this.registry.hasOwnProperty(eventType)) {
        this.registry[eventType].push(eventHandler);
    } else {
        this.registry[eventType] = [eventHandler];
    }
    return this;
};


