const bcrypt = require('bcryptjs');
const {config} = require(`../config/config`);
const {SALT} = config;

const genSalt = async () => {
    return await bcrypt.genSalt(parseInt(SALT));
}

exports.encrypt = async data => {
    return await bcrypt.hash(data, await genSalt());
}