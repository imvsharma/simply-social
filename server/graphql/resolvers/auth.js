const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const secretkey = require('../../config/config').config.SECRET_KEY;
const {userModel} = require('../../src/api/user/user.dao');
const {decrypt} = require('../../helpers/decrypt');


module.exports = {
    login: async ({email, password}) => {
        const user = await userModel.findOne({email});
        console.log(user);
        if(!user) {
            throw new Error('User not found');
        }

        const isEqual = await decrypt(password, user.password);
        if(!isEqual) {
            throw new Error('Password mismatch');
        }

        const token = jwt.sign({
            userId: user.id,
            email: user.email
        }, secretkey, {
            expiresIn: '1h'
        });

        return {
            userId: user.id,
            token: token,
            tokenExpiration: 1
        }
    }
}