const IndustryRepository = require('./IndustryRepositoryImpl')

const industryResolvers = {
  Query: {
    getIndustry: async (_, { id }) => {
      return {
        email: 'example@example.com',
        cnpj: 1234567890,
        phone: 1234567890,
      };
    },
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

    selectSupply: async (_, { supplyIdentificationInput }) => {
      const supplyInfo = new SupplyInfo(
        id = supplyIdentificationInput.supplyId,
        industryDocument = supplyIdentificationInput.industryDocument,
        supplierDocument = supplyIdentificationInput.supplierDocument,
      );
  
      return IndustryRepository.selectSupply(supplyInfo)
    }
  }

};

module.exports = industryResolvers;