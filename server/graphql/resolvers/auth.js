

const { userModel } = require('../../src/api/user/user.dao');
const { decrypt } = require('../../helpers/decrypt');
const { encrypt } = require('../../helpers/encrypt');
const { generateToken } = require('../../helpers/generateToken');

module.exports = {
    getUser: async ({ id, email }) => {
        const user = await userModel.findOne(
            {
                $or: [
                        { 
                            email
                        },
                        { 
                            _id: id 
                        }
                    ] 
            }
        );

        if (!user) {
            throw new Error("User not found");
        }
        
        return {
            _id: user._id,
            email: user.email
        }
    },

    login: async ({ email, password }) => {
        const user = await userModel.findOne({ email });
        console.log(user);
        if (!user) {
            throw new Error("User not found");
        }

        const isEqual = await decrypt(password, user.password);
        if (!isEqual) {
            throw new Error("Password mismatch");
        }

        const token = await generateToken(user._id);

        return {
            userId: user.id,
            token: token,
            tokenExpiration: 1
        };
    },

    createUser: async args => {
        const user = await userModel.findOne({ email: args.user.email });
        console.log('user', user)
        if (user) {
            throw new Error("User already Exists");
        } else {
            const hashedPassword = await encrypt(args.user.password);
            const { firstname, lastname, email } = args.user;
            const user = new userModel({
                firstname,
                lastname,
                email,
                password: hashedPassword
            });

            const savedUser = await user.save();
            console.log('saveduser', savedUser);
            return {
                _id: savedUser._id,
                email: savedUser.email
            };
        }
    },

    updatePassword: async args => {
        const user = await userModel.findOne({ _id: args.id });
        if (!user) {
            return {
                success: false,
                message: "User not found",
                statusCode: 404
            };
        } else {
            const hashedPassword = await encrypt(args.password);
            const updatedUser = await userModel.findOneAndUpdate(
                { _id: args.id },
                { $set: { password: hashedPassword } },
                { new: true }
            );
            if (!updatedUser) {
                return {
                    message: "user not updated"
                };
            } else {
                return {
                    success: true,
                    message: "password updated successfully"
                };
            }
        }
    }
};