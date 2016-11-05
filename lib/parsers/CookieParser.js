var CookieParser = function(req, res, next){
    //console.log('CookieParser');
    var list = {},
        rc = req.headers.cookie;

    rc && rc.split(';').forEach(function( cookie ) {
        var parts = cookie.split('=');
        list[parts.shift().trim()] = decodeURI(parts.join('='));
    });
    req.cookies = list;
    return next();
}

module.exports = CookieParser;