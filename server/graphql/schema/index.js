const {buildSchema} = require('graphql');

module.exports = buildSchema(`
    type User {
        _id: ID!
        email: String!
        password: String
    }

    type AuthData {
        userId: ID!
        token: String!
        tokenExpiration: String!
    }

    type RootQuery {
        login(email: String! , password: String!): AuthData!
    }

    schema {
        query: RootQuery
    }
`)