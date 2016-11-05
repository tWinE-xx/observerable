const Rx = require('rxjs');
const util = require('util');
var qs = require('querystring');
var RequestParamParser = function(req, res, next){
    //console.log('RequestParamParser');
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

module.exports = RequestParamParser;