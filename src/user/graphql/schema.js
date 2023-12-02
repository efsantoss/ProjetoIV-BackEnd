// Definindo o schema relacionado a industria
// São coleções de objetos dentro de um determinado banco de dados, 
const { gql } = require('apollo-server');

const supplierTypeDefs = gql`
    type LoginResult {
        message: String!,
        status: Boolean!,
        id: String!
    }

    input UserInput {
        email: String!,
        password: String!
    }

    type Query {
        userLogIn(userInput: UserInput): LoginResult
    }
`

module.exports = supplierTypeDefs;