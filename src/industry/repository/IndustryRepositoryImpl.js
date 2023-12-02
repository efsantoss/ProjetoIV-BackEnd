// Realização das funções no banco de dados

const Firebase = require('../../firebase/firebase');
const { ApolloError } = require('apollo-server');
const UserRepository = require('../../user/repository/UserRepositoryImpl')
const Industry = require('../mongo/Industry');

class IndustryRepositoryImpl {
  
  static async registerIndustry(email, document, phone, password) {
    try {
        const existingIndustry = await Industry.findOne({ email });

        if (existingIndustry) {
            throw new ApolloError("Essa Industria já está cadastrada", "I_RI_01");
          }
    
        if (document.length !== 14 && document.length !== 11) {
            throw new ApolloError("Document is not valid. " + document, "I_DL_03");
        }
        
        if (phone.length !== 9) {
            throw new ApolloError("Phone number must be 9 digits. " + phone, "I_PL_04");
        }

        if (password.length < 6) {
            throw new ApolloError("Password must be 6 or more digits. ", "I_PL_05");
        }
        
        const result = await UserRepository.signUp(email, password);

        if (result.status) {
          const newIndustry = new Industry({
            _id: result.id,
            email,
            document,
            phone
          });
      
          await newIndustry.save();

          return {
            email:email, 
            phone: phone, 
            cnpj: document
          };
        }
    } catch (error) {
        throw new ApolloError(error, "I_RI_02");
      }
  }


  static selectSupply(supplyInfo) {
    if (supplyInfo.id == "") {
      throw new ApolloError(
        "ID cannot be empty " + id, "I_ID_03");
    }

    if (supplyInfo.industryDocument.length !== 14 && supplyInfo.industryDocument.length !== 11) {
      throw new ApolloError("Document is not valid. " + supplyInfo.industryDocument, "I_DL_06");
    }

    if (supplyInfo.supplierDocument.length !== 14 && supplyInfo.supplierDocument.length !== 11) {
      throw new ApolloError("Document is not valid. " + supplyInfo.supplierDocument, "I_DL_06");
    }

    try {
      const firebase = new Firebase();

      firebase.pushData(
        'industries/' + supplyInfo.industryDocument + '/supplies', supplyInfo.id
      );
    } catch (error) {
        throw new ApolloError(error, 'DATA_NOT_SAVED');;
    }
  }
}

module.exports = IndustryRepositoryImpl;