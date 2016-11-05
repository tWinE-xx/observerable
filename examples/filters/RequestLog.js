var RequestLog = function(req, res, next){
    console.log(`${new Date().toDateString()} | ${req.method} | ${req.url} | body: ${req.body} | params: ${JSON.stringify(req.params)} | cookies: ${JSON.stringify(req.cookies)}`);
    return next();
}

module.exports = RequestLog;