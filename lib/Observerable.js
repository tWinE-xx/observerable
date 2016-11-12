//
const Rx = require('rxjs');
const http = require('http');
const util = require('util');
const requests_ = new Rx.Subject();
const RouteManager = require('./managers/RouteManager');
const FilterManager = require('./managers/FilterManager');
const SessionManager = require('./managers/SessionManager');
const HttpVerbs = require('./enums').HttpVerb;
const Observerable = {};
var Request = require('./helpers/Request');
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
    //add default filters
    this.filter(require('./parsers/RequestBodyParser'));
    this.filter(require('./parsers/RequestParamParser'));
    this.filter(require('./filters/ServeStaticFiles'));
    //create http server
    http.createServer((req, res) => {
        //delegate request handling
        requests_.next({ req: req, res: res });
    }).listen(port, domain, () => {
        this.logger.info(`Observerable is up and running on http://${domain}:${port}/`);
        this.logger.debug(RouteManager.showRoutes());
        //react to request
        requests_
            .subscribe(e=>{
                //run application level filters
                FilterManager.execute(e.req, e.res, ()=>{
                    var subject = RouteManager.get(getRequestRoute(e.req), getRequestVerb(e.req));
                    if (subject instanceof Error) 
                        return e.res.end(e.req.url);
                    //run user api implementation
                    return subject.next(new Request(e.req, e.res));
                });
            });
    });
    return this;
}
/*
    Summary:
        expose logger
    Input:
        n/a
    Output: 
        LogProvider
*/
Observerable.logger = require('./LogProvider.js');
/*
    Summary:
        expose static file library to serve static files
    Input:
        path: path to static file folder
    Output: 
        Observerable
*/
Observerable.static = function(path){
    this.staticPath = path;
    return this;
}
/*
    Summary:
        expose sessionManager for session operations
    Input:
       na
    Output: 
        SessionManager
*/
Observerable.session = SessionManager;
/*
    Summary:
        filter registration 
    Input:
        baseRoute: modules base uri
        module: node.js module
    Output: 
        Observerable
*/
Observerable.filter = function(filterName, Fn) {
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
Observerable.module = function(baseRoute, module){
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