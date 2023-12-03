const IndustryRepository = require('./IndustryRepositoryImpl')

const industryResolvers = {
  Query: {
    getIndustry: async (_, { industryId }) => {
      return {
        email: 'example@example.com',
        cnpj: 1234567890,
        phone: 1234567890,
      };
    },

    getIndustryHistory: async (_, { industryId }) => {
      const industryHistory = await IndustryRepository.getIndustryHistory(industryId)

      return industryHistory;
    }
  },

  Mutation: {
    createIndustry: async (_, { industryInput }) => {
      const industry =  await IndustryRepository.registerIndustry(
        industryInput.email,
        industryInput.cnpj,
        industryInput.phone,
        industryInput.password
      ); 

      return industry;
    },

    selectSupply: async (_, { industryId, supplierId, supplyId }) => {
      const selectSupplyResult = await IndustryRepository.selectSupply(
        industryId,
        supplierId,
        supplyId
      );
      
      return selectSupplyResult.status;
    }
  }

};

module.exports = industryResolvers;