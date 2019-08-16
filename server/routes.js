const {userRoutes} = require('./src/api/user/user.routes');

const healthcheck = function(router) {
    router.get('/healthcheck', function(request, response, next) {
        //filelogger.info('Hit healthcheckapi');
        response.json({
            success: true,
            message: 'Server APIs are up.'
        });
    })
};

exports.routes = (router, passport) => {
    healthcheck (router);
    userRoutes(router, passport);
}