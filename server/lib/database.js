import mongoose from 'mongoose';
/* import colors from './../utils/chalk'; */
import dotenv from 'dotenv';

/* const yellow = colors.yellow;
const red = colors.red;
const green = colors.green; */
import findConfig from 'find-config';
import colors from '../utils/chalk';
dotenv.config({path:findConfig('.env')});
const dbURL = require(`../config/${process.env.NODE_ENV}`).DBURL;
export default class DbConnectivity {
    constructor () {
        this.init();
    }

    init = () => {
        mongoose.connect(dbURL, { useNewUrlParser: true });
        mongoose.connection.on('connected', function () {
            console.log(colors.yellow('=========================================='));
            console.log(colors.green("Mongoose default connection is open to ", dbURL));
            console.log(colors.yellow('=========================================='));
        });

        mongoose.connection.on('error', function(err){
            console.log(colors.yellow('=========================================='));
            console.log(colors.red("Mongoose default connection has occured "+err+" error"));
            console.log(colors.yellow('=========================================='));
        });
    
        mongoose.connection.on('disconnected', function(){
            console.log(colors.yellow('=========================================='));
            console.log(colors.red("Mongoose default connection is disconnected"));
            console.log(colors.yellow('=========================================='));
        });

        process.on('SIGINT', function(){
            mongoose.connection.close(function(){
                console.log(colors.yellow('=========================================='));
                console.log(colors.red("Mongoose default connection is disconnected due to application termination"));
                console.log(colors.yellow('=========================================='));
                process.exit(0)
            });
        });
    }
}