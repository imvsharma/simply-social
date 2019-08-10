const express = require('express');
const passport = require('passport');
const {appUse} = require('./utils/app-use');
const setupPassport = require('./lib/passport');
const {routes} = require('./routes');
const app = express();
const router = express.Router();

require('./lib/database')();
setupPassport(passport);
appUse(app,router)
routes(router,passport)
 
module.exports =  app;