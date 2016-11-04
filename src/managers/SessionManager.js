const util = require('util');

var session; 

function SessionManager(){
    session = {};
}

SessionManager.prototype.create = function(){    
    var sessionId = guid();
    session[sessionId] = {};
    return sessionId;
}

SessionManager.prototype.all = function(){
    return session;
}

SessionManager.prototype.get = function(sessionId){
    //validations
    if (util.isNullOrUndefined(sessionId)) return new Error("no sessionId provided");
    return session[sessionId];
}

module.exports = new SessionManager();

function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
    s4() + '-' + s4() + s4() + s4();
}