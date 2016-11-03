var extendRequest = function(req, res, next){

    req.param = function(name){
        return req.params[name];
    }
    
    return next();
}

module.exports = extendRequest;