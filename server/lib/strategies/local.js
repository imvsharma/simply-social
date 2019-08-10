const {Strategy} = require('passport-local');
const {userModel} = require('../../src/api/user/user.dao');

const option = {
    usernameField : 'email',
    passwordField : 'password',
    passReqToCallback : true
}

exports.local = {
    signup : new Strategy (option, function (req, email, password, done) {
        userModel.get({
            email: email
        }, function (err, user) {
            if (err) {
                return done(err);
            }
            if (user) {
                return done (null,false);
            } else {
                userModel.hashPassword(password, function (err, hashedPassword) {
                    if (err) {
                    }
                    password = hashedPassword;
                    const data = Object.assign(req.body, {email: email,password: password,})
                    /* const data = {
                        fullname: req.body.fullname,
                        username: req.body.username,
                        email: email,
                        password: password,
                    }; */
                        
                    userModel.create(data, function (err, userFromDB) {
                        if(err){
                            return done(err);
                        }
                        return done (null, userFromDB);
                    })
                })
            }
        })
    }),

    login: new Strategy(option, function (req, email, password, done) {
        userModel.get({
            email: email
        }, function (err, user) {
            if(err){
                return done(err);
            }

            if(!user){
                return done(null, {
                    status: false,
                    message : "User of that email id is not found"
                });
            }

            userModel.comparePassword(password, user.password, function (err, isMatch) {
                if(err){
                    return done(err)
                }

                if(!isMatch){
                    return done(null,{
                        status: false,
                        message : "Password is incorrect"
                    })
                }else{
                    return done(null, user);
                }
            })
        })
    })

}