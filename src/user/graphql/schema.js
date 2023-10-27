// Definindo o schema relacionado ao usuario

const { gql } = require('apollo-server');

const industryTypeDefs = gql`
  type Mutation {
    signInWithEmailAndPassword(email: String!, password: String!): Boolean
    createUserWithEmailAndPassword(email: String!, password: String!): Boolean
  }
`;

module.exports = industryTypeDefs;