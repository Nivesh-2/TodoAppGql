const { buildSchema } = require("graphql");

module.exports = buildSchema(`

    type Todo {
        id: ID!
        description: String!
        targetDate: String!
    }

    input todoContent {
        description: String!
        targetDate: String!
    }

    type Query{
        hello: String!
        getTodos: [Todo!]
        getTodo(id: String!): Todo!
    }

    type Mutation{
        addTodo(inputVal: todoContent): String!
        updateTodo(inputVal: todoContent, todoId: String!): Todo!
        deleteTodo(todoId: String!): Todo!
    }
`);
