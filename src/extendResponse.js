var extendResponse = function(req, res, next){
    res.json = function(statusCode, data){
        res.statusCode = 200;
        //res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(data));
    }
    /*
    res.param = function(name){
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(data));
    }
    */
    return next();
}

module.exports = extendResponse;