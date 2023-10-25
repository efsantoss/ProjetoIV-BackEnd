// Definindo o schema relacionado a industria

const { gql } = require('apollo-server');

const industryTypeDefs = gql`
  type Industry {
    email: String
    cnpj: Int
    phone: Int
  }

  input IndustryInput {
    email: String
    cnpj: Int
    phone: Int
  }

  type Query {
    getIndustry(id: ID!): Industry
  }
  
  type Mutation {
    saveIndustry(industry: IndustryInput): Boolean
  }
`;

module.exports = industryTypeDefs;
