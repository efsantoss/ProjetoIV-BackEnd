// Definindo o schema relacionado a industria
// São coleções de objetos dentro de um determinado banco de dados, 
// que organizam vários aspectos e são importantes para segmentação da segurança, 
// facilitando a administração dos objetos e dos dados.

//importando o graphql no apollo server
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
    password: String!
  }

  input SupplyIdentificationInput {
    supplyId: String!,
    industryDocument: String!
    supplierDocument: String!
  }

  type Query {
    getIndustry(id: ID!): Industry
  }
  
  type Mutation {
    createIndustry(industryInput: IndustryInput!): Industry
    selectSupply(supplyIdentificationInput: SupplyIdentificationInput): Supply
  }
`;
// em mutation e query definimos a estrutura de uma função do graphql
// toda fez que fomos criar um tipo de parâmetro(no caso o IndustryInput), que nao seja primario( id, boolean, int, string ), precisamos colocar como sufixo input,
// precisamos escrever input NomeDoParametroInput{ valores }, caso um valor tiver !, ele eh obrigatoriamente NAO NULO
module.exports = industryTypeDefs;

// Query == Consulta ( sempre que fomos fazer uma consulta no bancod e dados usaremos o query)
// Mutation == Mudança ( sempre que formos alterar ou salvar algo no banco de dados usaremos o mutation)