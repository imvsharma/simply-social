const jwt = require('jsonwebtoken');
const secretkey = require('../../config/config').config.SECRET_KEY;
const {userModel} = require('../../src/api/user/user.dao');
const {decrypt} = require('../../helpers/decrypt');
const {encrypt} = require('../../helpers/encrypt');

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
    },

    createUser: async (args) => {
        const user = await userModel.findOne({email: args.user.email});
        if(user) {
            throw new Error('User already Exists');
        } else {
            const hashedPassword = await encrypt(args.user.password);
            const {firstname, lastname, email} = args.user
            const user = new userModel({
                firstname,
                lastname,
                email,
                password: hashedPassword
            })

            const savedUser = await user.save();
            return {
                _id: savedUser._id
            }
        }
    },

    updatePassword: async args => {
        console.log(args);
        const user = await userModel.findOne({_id: args.id});
        console.log('user', user);
        if(!user) {
            return {
                success: false,
                message: "User not found",
                statusCode: 404
            }
        } else {
            //query,{$set : updateData},{new : true}
            console.log('user found');
            const hashedPassword = await encrypt(args.password);
            console.log('hash',hashedPassword);
            const updatedUser = await userModel.findOneAndUpdate({_id: args.id}, {$set: {password: hashedPassword}}, {new: true});
            console.log(updatedUser);
            if(!updatedUser) {
                return {
                    message: "user not updated"
                }
            } else {
                return {
                    success: true,
                    message: "password updated successfully"
                }
            }
        }
    }
}