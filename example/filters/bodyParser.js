const Rx = require('rxjs');
const util = require('util');
var qs = require('querystring');
var bodyParser = function(req, res, next){
    if (req.method == 'POST') {
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
        var paramsAsStr = req.url.split('?')[1];
        if (util.isNullOrUndefined(paramsAsStr)){
            req.params = null; 
            next();
        } else {
            var tmpParams = {}, varkeyValArr; 
            paramsAsStr.split('&').forEach(function(keyVal) {
                varkeyValArr = keyVal.split('=');
                tmpParams[varkeyValArr[0]] = varkeyValArr[1];
            }, this);
            req.params = tmpParams;
            next();
        }
    }
}

module.exports = bodyParser;