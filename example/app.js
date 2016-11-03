const Observerable = require('../src/observerable')();

Observerable.start(8080, 'localhost')
    //.registerFilter(require('./filters/testAsync'))
    //.registerFilter(require('./filters/testSync'))
    //.registerFilter(require('./filters/requestLog'))
    .registerFilter(require('./filters/bodyParser'))
    .registerModule('/users', require('./modules/usersModule'))
    .registerModule('/login', require('./modules/loginModule'));


