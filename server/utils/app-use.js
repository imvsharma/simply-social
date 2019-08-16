const bodyParser = require('body-parser');
const morgan = require('morgan');
const passport = require('passport');
const {logger} = require('../lib/middlewares/logger');
exports.appUse = (app, router) => {
    app.use(logger);
    //app.use(morgan('combined'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended:true}));
    app.use(passport.initialize());
    app.use(passport.session())
    app.use(function(req, res, next) {
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader("Access-Control-Allow-Credentials", "true");
        res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
        res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Origin,Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers,Authorization");
        next();
    });
    app.use('/api/v1', router);
    app.use(function(err, req, res, next) {
        console.log(err)
        console.error(err.message); // Log error message in our server's console
        if (!err.statusCode) err.statusCode = 500; // If err has no specified error code, set error code to 'Internal Server Error (500)'
        res.status(err.statusCode).send(err.message); // All HTTP requests must have a response, so let's send back an error with its status code and message
    });
}