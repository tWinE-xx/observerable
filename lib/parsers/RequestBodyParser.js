const HttpVerbs = require('../enums').HttpVerb;
var RequestBodyParser = function(req, res, next){
    //console.log('RequestBodyParser');
    if (req.method == HttpVerbs.POST) {
        var body = '';

        req.on('data', function (data) {
            body += data;
            
            // Too much POST data, kill the connection!
            // 1e6 === 1 * Math.pow(10, 6) === 1 * 1000000 ~~~ 1MB
            if (body.length > 1e6)
                req.connection.destroy();
        });

        req.on('end', function () {
            try{
                req.body = JSON.parse(body);
                next();
            } catch(e) {
                res.statusCode = 500;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({"what": "body parsing error, not JSON"}));
            }
        });
    } else {
        next();
    }
}

module.exports = RequestBodyParser;