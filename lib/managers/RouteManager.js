const util = require('util');
const logger = require('../LogProvider');
var routes; 

function RouteManager(){
    routes = {};
}

RouteManager.prototype.showRoutes = function(){
    logger.debug('request mapping =============================== start');
    var r = [];
    for (prop in routes) {
        if (hasOwnProperty.call(routes, prop)) {
            if (!util.isNullOrUndefined(prop)) logger.debug(prop);
        }
    }
    return 'request mapping =============================== end'
}

RouteManager.prototype.all = function(){
    return routes;
}

RouteManager.prototype.get = function(route, verb){
    //validations
    if (util.isNullOrUndefined(route)) return new Error("no route provided");
    if (util.isNullOrUndefined(verb)) return new Error("no verb provided");
    if (util.isNullOrUndefined(routes[verb + ' ' + route])) return new Error(`route ${route} is not registered`);
    return routes[verb + ' ' + route];
}

RouteManager.prototype.register = function(route, verb, subject){
    //validations
    if (util.isNullOrUndefined(route)) return new Error("no route provided");
    if (util.isNullOrUndefined(verb)) return new Error("no verb provided");
    if (util.isNullOrUndefined(subject)) return new Error("no subject provided");
    if (!util.isFunction(subject.next)) return new Error("subject is not a Subject");
    //
    if (!util.isNullOrUndefined(routes[verb + ' ' + route]))
        return new Error(`route ${route} is already registered`);
    routes[verb + ' ' + route] = subject;
    return true;
    
}

RouteManager.prototype.unregister = function(route, verb){
    //validations
    if (util.isNullOrUndefined(route)) return new Error("no route provided");
    if (util.isNullOrUndefined(verb)) return new Error("no verb provided");
    if (util.isNullOrUndefined(routes[verb + ' ' + route]))
        return new Error(`verb route ${verb + ' ' + route} is not registered`);
    delete routes[verb + ' ' + route];
    return true;
}

RouteManager.prototype.clear = function(){
    routes = {};
}

module.exports = new RouteManager();