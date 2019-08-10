/* user api dao functions */
var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var {userSchema} = require('./user.model');

userSchema.statics = {
    hashPassword : function (password, cb) {
        bcrypt.genSalt(10, function (err, salt) {
            if (err) {
                return cb(err)
            }

            bcrypt.hash(password, salt, function (err, hashpassword) {
                if (err) {
                    return cb(err)
                }
                return cb(null, hashpassword);
            })
        })
    },

    comparePassword : function (password, hashpassword, cb) {
        bcrypt.compare(password, hashpassword, function (err, isMatch) {
            if(err){
                return cb(err);
            }
            return cb(null, isMatch);
        })
    },

    create : function(data, cb){
        var user = new this(data);
        user.save(cb);
    },

    get : function(query, cb){
        this.findOne(query,cb);
    },

    getById : function(query, cb){
            this.findById(query, cb);
    },

    update : function(query, updateData, cb){
            this.findOneAndUpdate(query,{$set : updateData},{new : true}, cb)
    }
}

exports.userModel = mongoose.model('User',userSchema);

