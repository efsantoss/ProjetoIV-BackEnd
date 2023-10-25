// Definindo o schema relacionado a industria

const { gql } = require('apollo-server');

const industryTypeDefs = gql`
  type Industry {
    email: String!
    cnpj: String!
    phone: String!
  }

  input IndustryInput {
    email: String!
    cnpj: String!
    phone: String!
  }

  type Query {
    getIndustry(id: ID!): Industry
  }
  
  type Mutation {
    createIndustry(industry: IndustryInput!): Industry
  }
`;

module.exports = industryTypeDefs;
