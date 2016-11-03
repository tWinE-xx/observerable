//
const Rx = require('rxjs');
const http = require('http');
const util = require('util');
const requests_ = new Rx.Subject();
const RouteManager = require('./routeManager');
const FilterManager = require('./filterManager');
const HttpVerbs = require('./enums').HttpVerb;
const Observerable = {};
//
exports = module.exports = bootstrap;
//
function bootstrap(){
   return Observerable;
}
/*
    Summary:
        filter registration 
    Input:
        baseRoute: modules base uri
        module: node.js module
    Output: 
        Observerable
*/
Observerable.start = function(port, domain){
    //init param validations
    if (util.isNullOrUndefined(port) || port == '' || !util.isNumber(port))
        port = 8080; 
    if (util.isNullOrUndefined(domain) || domain == '')
        domain = 'localhost';  
    //create http server
    http.createServer((req, res) => {
        //delegate request handling
        requests_.next({ req: req, res: res });
    }).listen(port, domain, () => {
        console.log(`Server running at http://${domain}:${port}/`);
        //react to request
        requests_
            .map(e=>{
                Rx.Observable.from(FilterManager.all())
                    .map(filter=>filter.call(null, e.req, e.res))
                    .subscribe(r=>e);
                return e;
            })
            .subscribe(e=>{
                var subject = RouteManager.get(getRequestRoute(e.req), getRequestVerb(e.req));
                if (subject instanceof Error) 
                    return e.res.end(e.req.url);
                //
                return subject.next(e);
                /*
                var req = e.req, res = e.res;
                require('async').waterfall(FilterManager.all(), function (err, result) {
                    return subject.next(e);   
                });
                */
            });
    });
    return this;
}
/*
    Summary:
        filter registration 
    Input:
        baseRoute: modules base uri
        module: node.js module
    Output: 
        Observerable
*/
Observerable.registerFilter = function(filterName, Fn) {
    FilterManager.register(filterName, Fn);
    return this;
}
/*
    Summary:
        module registration 
    Input:
        baseRoute: modules base uri
        module: node.js module
    Output: 
        Observerable
*/
Observerable.registerModule = function(baseRoute, module){
    module(createModule(baseRoute));
    return this;
}

function createModule(baseRoute){
    return {
        baseRoute: baseRoute,
        get: get,
        post: post
    };
}

var get = function(route){
    var subject = new Rx.Subject();
    RouteManager.register(this.baseRoute+route, HttpVerbs.GET, subject);
    return subject;
}

var post = function(route){
    var subject = new Rx.Subject();
    RouteManager.register(this.baseRoute+route, HttpVerbs.POST, subject);
    return subject;
}


function getRequestRoute(req){
    return req.url.split('?')[0];
}

function getRequestVerb(req){
    switch (req.method){
        case 'GET':
            return HttpVerbs.GET;
        case 'POST':
            return HttpVerbs.POST;
        default:
            console.log(`http verb ${req.method} is not supported`);
            return null;
    }
}