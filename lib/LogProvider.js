const winston = require('winston');
module.exports = new (winston.Logger)({
    transports: [
        new winston.transports.Console({
            handleExceptions: true,
            json: false,
            level: 'debug'
        })
        /*,
        new (winston.transports.File)({
            name: 'info-file',
            filename: 'filelog-info.log',
            level: 'info'
        })*/
    ]
});