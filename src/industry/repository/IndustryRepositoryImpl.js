const Firebase = require('../../firebase/firebase');
const { ApolloError } = require('apollo-server');
const industryErrorCodes = require('../domain/exception/IndustryErrorCodes')

class IndustryRepositoryImpl {

    static createIndustry(industry) {
      if (industry.cnpj.length !== 14) {
        throw new ApolloError(
          "CNPJ must be 14 digits. " + industry.cnpj, industryErrorCodes.INVALID_CNPJ_LENGTH);
      }
  
      if (industry.phone.length !== 9) {
        throw new ApolloError("Phone number must be 9 digits. " + industry.phone, industryErrorCodes.INVALID_PHONE_LENGTH);
      }
  
      try {
        const firebase = new Firebase();

        firebase.saveData(
            'industries/' + industry.cnpj, industry
          );
  
          return industry;
      } catch (error) {
          throw new ApolloError(error, 'DATA_NOT_SAVED');;
      }
  };
}

module.exports = IndustryRepositoryImpl;