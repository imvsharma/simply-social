/* user api schema */
const mongoose = require('mongoose');
const schema = mongoose.Schema;
const postSchema = new schema({
    title : {
        type : String,
        unique : false
    },
    descriptions : {
        type : String,
        unique : false
    },
    date: {
        type: Date,
        default: Date.now
    },
    author: {
        type: schema.Types.ObjectId,
        $ref: 'User',
        unique: false
    }
    
},{timestamps : true});

exports.postModel = mongoose.model('Post',postSchema);
