// Realização das funções no banco de dados
const { ApolloError } = require('apollo-server');
const UserRepository = require('../../user/repository/UserRepositoryImpl')
const Industry = require('../mongo/Industry');
const SupplierRepository = require('../../supplier/repository/SupplierRepositoryImpl');
const Supplier = require('../../supplier/mongo/Supplier');

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

  static async selectSupply(industryId, supplierId, supplyId) {
    if (supplierId === "") {
      throw new ApolloError(
        "supplierId cannot be empty " + supplyId, "I_ID_03");
    }

    if (supplyId == "") {
      throw new ApolloError(
        "supplyId cannot be empty " + supplyId, "I_ID_04");
    }

    const supply = await SupplierRepository.getSupply(supplierId, supplyId);

    if (!supply) {
      throw new ApolloError("Fornecimento não encontrado", "S_GS_03");
    } else {
      try {
        const existingIndustry = await Industry.findById(industryId);
  
        if (!existingIndustry) {
            throw new ApolloError("Industria não encontrada", "I_SS_01");
        } 

        const newSupplyHistory = {
          address: supply.address,
          quantity: supply.quantity
        }

        existingIndustry.history.push(newSupplyHistory);
        await existingIndustry.save();

        return {
          message: "Histórico da industria adicionado com sucesso",
          status: true,
          supply: supply
        };
      } catch (error) {
        throw new ApolloError(error, "I_SS_02");
      }
    }
  }

  static async getIndustryHistory(industryId) {
    try {
      const existingIndustry = await Industry.findById(industryId);

       if (!existingIndustry) {
          throw new ApolloError("Industria não encontrada", "I_GIH_01");
      }
      
      if (!existingIndustry.history) {
        throw new ApolloError("Historico da Industria não encontrado", "I_GIH_03");
      }

      return existingIndustry.history;
    } catch (error) {
      throw new ApolloError(error, "I_GIH_02");
    }
  }

}

module.exports = IndustryRepositoryImpl;