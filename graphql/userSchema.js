const { buildSchema } = require("graphql");

module.exports = buildSchema(`
    type User {
        id: ID! 
        name: String!
        email: String!
        password: String!
    }

    input UserContent {
        name: String!
        email: String!
        password: String!
    }

    input loginData {
        email: String!
        password: String!
    }

    type Query{
        hello: String!
        findUser(userId: String!): User!
        findUsers: [User!]
    }

    type Mutation {
        createUser(inputVal: UserContent): String!
        loginUser(inputVal: loginData): String!
    }
`);
