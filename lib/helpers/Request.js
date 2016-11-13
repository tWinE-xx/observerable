const Rx = require('rxjs');
const SessionManager = require('../managers/SessionManager');
const util = require('util'); 

function Request(request, response){
    var cookies = doCreateCookies(request);
    var session = doCreateSession(request, response, cookies);
    return {
        request: request,
        response: response,
        body: request.body,
        params: request.params,
        json: doResponseJSON.bind(response),
        cookies: cookies, 
        session: session,
        state: {}      
    }
}

module.exports = Request; 

function doCreateCookies(request){
    var list = {},
        rc = request.headers.cookie;
    rc && rc.split(';').forEach(function( cookie ) {
        var parts = cookie.split('=');
        list[parts.shift().trim()] = decodeURI(parts.join('='));
    });
    return list;
}

function doResponseJSON(statusCode, data){
    var response = this;
    return Rx.Observable.create(function(observer) {
        response.statusCode = statusCode;
        response.setHeader('Content-Type', 'application/json');
        response.end(JSON.stringify(data));
        observer.next(response);
        observer.complete();
    });
}

function doCreateSession(request, response, cookies){
    if (util.isNullOrUndefined(cookies) || util.isNullOrUndefined(cookies['sessionId'])){
        //create new session
        var sessionId = SessionManager.create(request, response);
        //return sessionId to client
        response.setHeader('Set-Cookie', 'sessionId='+sessionId+';path=/;expithis.response='+new Date(new Date().getTime()+1000*60*30).toUTCString());
        //
        return SessionManager.get(sessionId);  
    }
    //get sessionId
    var sessionId = cookies['sessionId'];
    //check if session exists
    if (!util.isNullOrUndefined(sessionId)){
        return SessionManager.get(sessionId); 
    }
}
