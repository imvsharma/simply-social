const express = require('express');
const morgan = require('morgan');

let app = express();
require('./lib/database')();
 
module.exports =  app;