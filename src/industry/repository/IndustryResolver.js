// funções relacionadas a industria

const Industry = require('../model/Industry');
const IndustryRepository = require('./IndustryRepositoryImpl')

// resolvers definem a implementação das querys e mutation
// resolver basicamente vai definir oque determinada query ou mutation vai fazer quando ser chamada no graphql
const industryResolvers = {
  Query: {
    getIndustry: async (_, { id }) => {
      // Implement logic to fetch industry data based on the provided ID
      // Replace the following placeholder code with the actual logic
      return {
        email: 'example@example.com',
        cnpj: 1234567890,
        phone: 1234567890,
      };
    },
  },

  // aki temos as implementações das mutations
  Mutation: {
    createIndustry: async (_, {industry}) => {
      const industryData = new Industry(
        email = industry.email,
        cnpj = industry.cnpj,
        phone = industry.phone);
        
      return IndustryRepository.createIndustry(industryData) 
    },
  }

};

module.exports = industryResolvers;