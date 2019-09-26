const bcrypt = require('bcryptjs');

exports.decrypt = async (plainText, encryptText) => {
    return await bcrypt.compare(plainText, encryptText);
}