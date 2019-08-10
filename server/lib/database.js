const mongoose = require('mongoose');

const {colors} = require('../utils/colors');
const {config} = require(`../config/config`);
const {dbURL} = config;



module.exports =() => {
    mongoose.connect(dbURL, {useNewUrlParser:true});
    mongoose.connection.on('connected', function(){
        console.log(colors.yellow('===================================================='));
        console.log(colors.green("Mongoose default connection is open and connected"));
        console.log(colors.yellow('===================================================='));
    });
    mongoose.connection.on('error', function(err){
        console.log(colors.yellow('===================================================='));
        console.log(colors.red("Mongoose default connection has occured "+err+" error"));
        console.log(colors.yellow('===================================================='));
    });
    mongoose.connection.on('disconnected', function(){
        console.log(colors.yellow('===================================================='));
        console.log(colors.red("Mongoose default connection is disconnected"));
        console.log(colors.yellow('===================================================='));
    });
    process.on('SIGINT', function(){
        mongoose.connection.close(function(){
            console.log(colors.yellow('===================================================='));
            console.log(colors.red("Mongoose default connection is disconnected due to application termination"));
            console.log(colors.yellow('===================================================='));
            process.exit(0)
        });
    });
};