const axxer = require('axxer');
const options = {
    dir: 'logs'
}

const logger = new axxer.Logger(options);

exports.textLogger = (level, message) => {
    logger.textLogger(level, message)
}