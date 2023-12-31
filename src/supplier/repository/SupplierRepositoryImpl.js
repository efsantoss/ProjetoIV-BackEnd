const { ApolloError } = require('apollo-server');
const UserRepository = require('../../user/repository/UserRepositoryImpl')
const Supplier = require('../mongo/Supplier')
const ServerClient = require('../../server/model/ServerClient');

const serverClient = new ServerClient();

class SupplierRepositoryImpl {

    static async registerSupply(email, document, phone, password) {
        try {
            const existingSupplier = await Supplier.findOne({ email });

            if (existingSupplier) {
                throw new ApolloError("Este fornecedor já está cadastrado " + "id: " + existingSupplier._id, "S_RI_01");
              }
        
            if (document.length !== 14 && document.length !== 11) {
                throw new ApolloError("Document is not valid. " + document, "S_DL_02");
            }
            
            if (phone.length !== 9) {
                throw new ApolloError("Phone number must be 9 digits. " + phone, "S_PL_03");
            }
    
            if (password.length < 6) {
                throw new ApolloError("Password must be 6 or more digits. ", "S_PL_04");
              }
              
            const result = await UserRepository.signUp(email, password)

            if (result.status) {
              const newSupplier = new Supplier({
                _id: result.id,
                email: email,
                document: document,
                phone: phone
              });
          
              await newSupplier.save();

              return {email, phone, document};
            }
        } catch (error) {
            throw new ApolloError(error, "S_RS_02");
          }
    }

    static async addSupplierHistory(supplierId, historyEntry) {
        try {
          const supplier = await Supplier.findById(supplierId);
    
          if (!supplier) {
            throw new ApolloError("Fornecedor não encontrado", "S_ASH_01");
          }
    
          const serverResult = await serverClient.sendToServer(historyEntry);
        
          if (serverResult) {
            supplier.history.push(historyEntry);
            supplier.supplies.push(historyEntry);
            await supplier.save();
      
            return {
              message: "Fornecimento adicionado com sucesso",
              status: true,
              id: supplierId,
              supply: historyEntry
            };
          } else {
            throw new ApolloError("Verifique os dados enviados!", "S_ASH_03");
          }

        } catch (error) {
          throw new ApolloError(error, "S_ASH_02");
        }
    }

    static async getSupplies() {
        try {
          const supplies = await Supplier.find({}, 'id supplies');
    
          return supplies.map((supplier) => {
            return {
                id: supplier._id,
                supplies: supplier.supplies
            };
          });
        } catch (error) {
          throw new ApolloError(error, "S_GET_01");
        }
    }

    static async getSupply(supplierId, supplyId) {
      try {
        const supplier = await Supplier.findById(supplierId)

        if (!supplier) {
          throw new ApolloError("Fornecedor não encontrado", "S_GS_01");
        }

        const supply = supplier.supplies.find(supply => supply._id == supplyId);

        if (!supply) {
          throw new ApolloError("Fornecimento não encontrado", "S_GS_03");
        }

        return supply;
      } catch (error) {
        throw new ApolloError(error, "S_GS_02");
      }
    }

    static async deleteSupply(supplierId, supplyId) {
      try {
        const supplier = await Supplier.findById(supplierId)

        if (!supplier) {
          throw new ApolloError("Fornecedor não encontrado", "S_GS_01");
        }

        const supplyIndex = supplier.supplies.findIndex(supply => supply._id == supplyId);

        if (supplyIndex === -1) {
            throw new ApolloError("Fornecimento não encontrado", "S_GS_03");
        }

        supplier.supplies.splice(supplyIndex, 1);

        await supplier.save();
        
        return true;
      } catch (error) {
        throw new ApolloError(error, "S_GS_02");
      }
    }

    static async getSupplierHistory(supplierId) {
      try {
        const supplier = await Supplier.findById(supplierId);

        if (!supplier) {
          throw new ApolloError("Fornecedor não encontrado", "S_GSH_01");
        }

        const supplierHistory = supplier.history;

        if (!supplierHistory) {
          throw new ApolloError("Fornecimento não encontrado", "S_GSH_03");
        }

        return supplierHistory;
      } catch (error) {
        throw new ApolloError(error, "S_GSH_02");
      }
    }

}

// aki eu quero exporta nao importar
module.exports = SupplierRepositoryImpl;