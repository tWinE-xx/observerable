var testSync = function(req, res, next){
    console.log('testSync', req.url);
    return next();
}

module.exports = testSync;