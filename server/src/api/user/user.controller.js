const jwt = require('jsonwebtoken');
const {userModel} = require('./user.dao');
const {config} = require('../../../config/config');
const {SECRET_KEY} = config;
const generateToken = user => {
    return jwt.sign (user, config.SECRET_KEY, {
        expiresIn: '6hr'
    });
};

const setUserInfo = request => {
    return {
        _id: request._id
    }
}

exports.User = {
    getUser: (request, response, next) => {
        userModel.get({_id: request.params.id}, (err, user) => {
            if(err) {
                response.json({
                    success: false,
                    message: "Error in getting user"
                })
            }

            if(!user) {
                response.json({
                    success: false,
                    message: "User not found"
                })
            } else {
                response.json({
                    success: true,
                    message: "User found successfully",
                    data: user
                })
            }
        })
    },

    signup: function(request, response, next) {
        const user = setUserInfo(request.user);
        console.log('user', user);
        response.status(201).json({
            success: true,
            message : "Signup Successfully",
            token : generateToken(user),
            user
        })
    },

    login: function(request, response, next) {
        if(request.user._id){
            const user = setUserInfo(request.user);
            response.status(200).json({
                message : "Login Successfully",
                token : generateToken(user),
                user
            })
        }else {
            response.status(401).json(request.user);
        }
        
        
    }

}