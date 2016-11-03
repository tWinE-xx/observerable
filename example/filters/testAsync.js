var testAsync = function(req, res, next){
    setTimeout(()=>{
        console.log('testAsync', req.url);
        return next();
    }, 3000);
}

module.exports = testAsync;