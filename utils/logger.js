require('dotenv').config()
const winston = require('winston');

function loggerProd() {
    return winston.createLogger({
        transports: [
            new winston.transports.File({
                filename: "logs/prod-error.log",
                level: "error",
            }),
        ],
    });
}

function loggerDev() {
    return winston.createLogger({
        transports: [
            new winston.transports.Console({
                format: winston.format.simple(),
            }),
            new winston.transports.File({
                filename: "logs/error.log",
                level: "error",
            }),
            new winston.transports.File({
                filename: "logs/warn.log",
                level: "warn",
            }),
        ],
    });
}

let logger = null;
if (process.env.NODE_ENV === "PROD") {
    logger = loggerProd();
    logger.info("logger iniciado en producción");
} else {
    logger = loggerDev();
    logger.info("logger iniciado en desarrollo");
}

module.exports = logger