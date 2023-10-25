// Definindo o schema relacionado a industria

const { gql } = require('apollo-server');

const industryTypeDefs = gql`
  type Industry {
    email: String
    cnpj: Int
    phone: Int
  }

  type Query {
    getIndustry(id: ID!): Industry
  }
  
  type Mutation {
    saveIndustry(email: String, cnpj: Int, phone: Int): Boolean
  }
`;

module.exports = industryTypeDefs;
