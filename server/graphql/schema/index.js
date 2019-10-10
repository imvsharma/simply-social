const {buildSchema} = require('graphql');
const fileSystem = require('fs');
const responseType = fileSystem.readFileSync(`${__dirname}/type/common.graphql`, 'utf8');
const userType = fileSystem.readFileSync(`${__dirname}/type/user.graphql`, 'utf8');
const postType = fileSystem.readFileSync(`${__dirname}/type/post.graphql`, 'utf8');
const AuthDataType = fileSystem.readFileSync(`${__dirname}/type/authdata.graphql`, 'utf8');
const RootQuery = fileSystem.readFileSync(`${__dirname}/query/root.graphql`, 'utf8');

// Input
const UserInput = fileSystem.readFileSync(`${__dirname}/input/user.graphql`, 'utf8');
const postInput = fileSystem.readFileSync(`${__dirname}/input/post.graphql`, 'utf8');

//  Mutation
const RootMutation = fileSystem.readFileSync(`${__dirname}/mutation/root.graphql`, 'utf8');


module.exports = buildSchema(`
    ${responseType}
    ${userType}
    ${postType}
    ${AuthDataType}
    ${RootQuery}
    ${UserInput}
    ${postInput}
    ${RootMutation}
    schema {
        query: RootQuery
        mutation: RootMutation
    }
`)