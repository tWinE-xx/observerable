const Observerable = require('../../lib/Observerable')();
const visualV8 = require('visualv8')();

Observerable.start(8080, 'localhost')
    .static('www')
    //.filter(require('./filters/Csrf'))
    //.filter(require('./filters/RequestLog'))
    .module('/users', require('./modules/usersModule'))
    .module('/login', require('./modules/loginModule'));
