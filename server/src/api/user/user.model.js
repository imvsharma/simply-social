/* user api schema */
const mongoose = require('mongoose');
const schema = mongoose.Schema;
exports.userSchema = new schema({
    fullname : {
        type : String,
        unique : false
    },
    username : {
        type : String,
        unique : true
    },
    email : {
        type : String,
        unique : true,
    },
    password :{
        type : String,
        unique : false
    },
    facebook_id :{
        type:String
    },
    facebook_token:{
        type:String
    },
    google_id: {
        type:String
    },
    google_token: {
        type: String
    },
    twitter_id: {
        type:String
    },
    twitter_token: {
        type:String
    },
    availability: {
        type: String
    },
    status: {
        type: String
    },
    userDisplayPicURL: {
        type:String
    }
},{timestamps : true});
