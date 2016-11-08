const Observerable = require('../../lib/Observerable')();

Observerable.start(8080, 'localhost')
    .static('www')
    //.filter(require('./filters/Csrf'))
    .filter(require('./filters/RequestLog'))
    .module('/users', require('./modules/usersModule'))
    .module('/login', require('./modules/loginModule'));


