var ResponseJsonParser = function(req, res, next){
    //console.log('ResponseJsonParser');
    res.json = function(statusCode, data){
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(data));
    }

    return next();
}

module.exports = ResponseJsonParser;