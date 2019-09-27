const {buildSchema} = require('graphql');
const fileSystem = require('fs');
const userType = fileSystem.readFileSync(`${__dirname}/type/user.graphql`, 'utf8');
const AuthDataType = fileSystem.readFileSync(`${__dirname}/type/authdata.graphql`, 'utf8');
const RootQuery = fileSystem.readFileSync(`${__dirname}/query/root.graphql`, 'utf8');


module.exports = buildSchema(`
    ${userType}
    ${AuthDataType}
    ${RootQuery}
    schema {
        query: RootQuery
    }
`)