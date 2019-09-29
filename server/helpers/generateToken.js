const jwt = require('jsonwebtoken');
const secretkey = require('../config/config').config.SECRET_KEY;

exports.generateToken = async id => {
    return jwt.sign({
        _id: id
    }, secretkey, {
        expiresIn: '1h'
    });
}