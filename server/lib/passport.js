const passport = require('passport');
const {userModel}= require('../src/api/user/user.dao');
const {local} = require('./strategies/local');
const {login, signup} = local
/* const User = require('../src/api/user/user.dao')
const facebookAuth = require('./strategies/facebook');
const googleAuth = require('./strategies/google');
const localAuth = require('./strategies/local'); */

/* const jwt = require('./strategies/jwt') */
module.exports = () => {
    passport.serializeUser((user, done) => {
        done(null, user._id);
    });

    passport.deserializeUser((id, done) => {
        userModel.getById({_id: id}, (err, user) => {
            if(err){
                done(err);
            }
            done(null, user);
        })
    })


    //passport.use('jwt',jwt);
    /* passport.use('facebook', facebookAuth.FBAuth);
    passport.use('google', googleAuth.userGoogleAuth);*/
    passport.use('signup',signup);
    passport.use('login',login); 
   
}