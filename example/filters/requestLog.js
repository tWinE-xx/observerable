var requestLog = function(req, res, next){
    console.log('requestLog', req.url);
    console.log(`${new Date().toDateString()} ${req.method} ${req.url} data: ${req.body}`);
    return next();
}

module.exports = requestLog;