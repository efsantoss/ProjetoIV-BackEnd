// Definindo o schema relacionado a industria
// São coleções de objetos dentro de um determinado banco de dados, 
// que organizam vários aspectos e são importantes para segmentação da segurança, 
// facilitando a administração dos objetos e dos dados.

//importando o graphql no apollo server
const { gql } = require('apollo-server');

//const ( variavel constante em js )
const supplierTypeDefs = gql`

    type Supplier {
        email: String!
        document: String!
        phone: String!
    }

    type Supply {
        id: String!
        quantity: Int!
        address: String!
    }

    input SupplierInput {
        email: String!
        document: String!
        phone: String!
        password: String!
    }

    input SupplyDataInput {
        id: String!
        quantity: Int!
        address: String!
        document: String!
    }

    type Query {
        getSupplier(id: ID!): Supplier
        getSupplies: [Supply]!
    }

    type Mutation {
        createSupplier(supplier: SupplierInput!): Supplier
        updateHistory(supplyData: SupplyDataInput!): Supply
    }
`

// nomeDaFuncao( parametro dado à ela: tipo do parametro):retorno da função

module.exports = supplierTypeDefs;