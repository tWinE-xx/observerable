const Session = require('observerable')().session;

var Csrf = function(req, res, next){
    switch (req.method) {
        case 'GET':
            var token = Guid();
            //add csrf token in cookie
            res.setHeader('Set-Cookie', 'csrf='+token+';path=/;expires='+new Date(new Date().getTime()+1000*60*30).toUTCString());
            //add csrf token to session
            Session.add(req.cookies.sessionId, 'csrf', token);
            next();
            break;
        case 'POST'://verify csrf token
            //check for csrf token in request cookie
            if (req.cookies['csrf'] == '' || req.cookies['csrf'] == null || req.cookies['csrf'] == undefined)
                return res.json(403, {'forbidden': 'Cross-Site Request Forgery (CSRF)'});
            //verify cookie token with session token
            if (Session.get(req.cookies.sessionId)['csrf'] != req.cookies['csrf'])
                return res.json(403, {'forbidden': 'Cross-Site Request Forgery (CSRF)'});
            next();
            break;
        default:
            next();
            break;
    }
}

module.exports = Csrf;

function Guid() {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
        }
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
            s4() + '-' + s4() + s4() + s4();
    }