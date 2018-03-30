import winston from 'winston';

let logger = new (winston.Logger)({
    transports: [
        new (winston.transports.Console)({
            timestamp: function () {
                return new Date(Date.now()).toLocaleString();
            }
        })
    ]
});

module.exports = logger;