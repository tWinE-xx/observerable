const Rx = require('rxjs');
const util = require('util');
var qs = require('querystring');
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
            var post = qs.parse(body);
            req.body = body;
            next();
        });
    } else {
        next();
    }
}

module.exports = RequestBodyParser;