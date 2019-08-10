const {User} = require('./user.controller');

exports.userRoutes = (router, passport) => {
    router.post('/user/signup', passport.authenticate('signup', {session:false}), User.signup)
    router.post('/user/login', passport.authenticate('login',{session: false}), User.login);
}