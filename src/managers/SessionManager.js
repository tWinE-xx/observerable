const util = require('util');
const Utils = require('../helpers/Utils');

var sessions; 

function SessionManager(){
    sessions = {};
}

SessionManager.prototype.create = function(){    
    var sessionId = Utils.Guid();
    sessions[sessionId] = {};
    return sessionId;
}

SessionManager.prototype.all = function(){
    return sessions;
}

SessionManager.prototype.get = function(sessionId){
    //validations
    if (util.isNullOrUndefined(sessionId)) return new Error("no sessionId provided");
    var userSession = sessions[sessionId];
    if (util.isNullOrUndefined(userSession)){
        userSession = sessions[sessionId] = {};
    }    
    return userSession;
}

SessionManager.prototype.add = function(sessionId, key, value){
    //validations
    if (util.isNullOrUndefined(sessionId)) return new Error("no sessionId provided");
    if (util.isNullOrUndefined(sessions[sessionId])) return new Error(`no session exists from sessionId ${sessionId}`);
    sessions[sessionId][key] = value;
    return sessionId;
}

module.exports = new SessionManager();

