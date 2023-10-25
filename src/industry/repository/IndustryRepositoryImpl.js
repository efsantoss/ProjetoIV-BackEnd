const {database, ref, set} = require('../../firebase/firebase');
const { ApolloError } = require('apollo-server');

class IndustryRepositoryImpl {

    static saveIndustry(industry) {
      if (industry.cnpj.length !== 14) {
        throw new ApolloError("CNPJ must be 14 digits. " + industry.phone, 'INVALID_CNPJ_LENGTH');
      }
  
      if (industry.phone.length !== 9) {
        throw new ApolloError("Phone number must be 9 digits.", 'INVALID_PHONE_LENGTH');
      }
  
      try {
          set(ref(database, 'industries/' + industry.cnpj), {
              email: industry.email,
              cnpj: industry.cnpj,
              phone: industry.phone
            });
  
          return industry;
      } catch (error) {
          throw new ApolloError(error, 'DATA_NOT_SAVED');;
      }
  };
}

module.exports = IndustryRepositoryImpl;