const bcrypt = require('bcryptjs');
const {config} = require(`../config/config`);
const {SALT} = config;
//const salt = require('../config').config.SALT;

const genSalt = async () => {
    return await bcrypt.genSalt(SALT);
}

exports.encrypt = async data => {
    const generatedSalt = await genSalt();
    return await bcrypt.hash(data, generatedSalt);
}