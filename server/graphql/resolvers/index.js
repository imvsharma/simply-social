const authResolver = require('./auth');
const postResolver = require('./post.js');
module.exports = {
    ...authResolver,
    ...postResolver
}