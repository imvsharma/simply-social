const {postModel} = require('../models/posts');

module.exports = {
    createPost: async (args, request) => {
        if(!request.isAuth) {
            throw new Error('Not Authenticated');
        }
        console.log('args', args.postInput);
        const postInput = Object.assign(args.postInput, {author: request.userId})
        const post = new postModel(args.postInput);
        //console.log(request.isAuth);
        

        const savedPost = await post.save();
        return {
            _id: savedPost._id,
            title: savedPost.title,
            descriptions: savedPost.descriptions
        }
    }
}
