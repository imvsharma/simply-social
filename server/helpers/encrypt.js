const bcrypt = require('bcryptjs');
const salt = require('../config').config.SALT;

const genSalt = async () => {
    return await bcrypt.genSalt(salt);
}

exports.encrypt = async data => {
    const generatedSalt = await genSalt();
    return await bcrypt.hash(data, generatedSalt);
}