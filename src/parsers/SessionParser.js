const SessionManager = require('../managers/SessionManager');
const util = require('util'); 
var SessionParser = function(req, res, next){
    //console.log('SessionParser');
    //get sessionId
    var sessionId = req.cookies['sessionId'];
    //check if session exists
    if (!util.isNullOrUndefined(sessionId)){
        req.session = SessionManager.get(sessionId);
        return next();
    }
    //create new session
    var sessionId = SessionManager.create(req, res);
    //return sessionId to client
    res.setHeader('Set-Cookie', 'sessionId='+sessionId+';path=/;expires='+new Date(new Date().getTime()+1000*60*30).toUTCString());
    //return new session
    req.session = SessionManager.get(sessionId);
    return next();
}

module.exports = SessionParser;