const Observerable = require('../src/observerable')();

Observerable.start(8080, 'localhost')
    .filter(require('./filters/requestLog'))
    .module('/users', require('./modules/usersModule'))
    .module('/login', require('./modules/loginModule'));


