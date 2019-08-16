const mongoose = require('mongoose');
const {colors} = require('../utils/colors');
const {config} = require(`../config/config`);
const {textLogger} = require('../utils/logger');
const constants = require('../utils/constants');
const {dbURL} = config;



module.exports =() => {
    mongoose.connect(dbURL, {useNewUrlParser:true,useCreateIndex: true});
    mongoose.connection.on('connected', function(){
        /* console.log(colors.yellow('===================================================='));
        console.log(colors.green("Mongoose default connection is open and connected"));
        console.log(colors.yellow('====================================================')); */
        textLogger(constants.INFO, `{message: "Mongoose default connection is open and connected"}`)
    });
    mongoose.connection.on('error', function(err){
        /* console.log(colors.yellow('===================================================='));
        console.log(colors.red("Mongoose default connection has occured "+err+" error"));
        console.log(colors.yellow('====================================================')); */
        textLogger(constants.ERROR, `{message: "Mongoose default connection has occured error, error: ${err}}`)
    });
    mongoose.connection.on('disconnected', function(){
        /* console.log(colors.yellow('===================================================='));
        console.log(colors.red("Mongoose default connection is disconnected"));
        console.log(colors.yellow('====================================================')); */
        textLogger(constants.ERROR, `{message: "Mongoose default connection is disconnected"}`);
    });
    process.on('SIGINT', function(){
        mongoose.connection.close(function(){
            /* console.log(colors.yellow('===================================================='));
            console.log(colors.red("Mongoose default connection is disconnected due to application termination"));
            console.log(colors.yellow('====================================================')); */
            textLogger(constants.ERROR, `{message: "Mongoose default connection is disconnected due to application termination"}`);
            
            process.exit(0)
        });
    });
};