const { ApolloError } = require('apollo-server');
const UserRepository = require('../../user/repository/UserRepositoryImpl')
const Supplier = require('../mongo/Supplier')

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

          console.log(supplier);
    
          if (!supplier) {
            throw new ApolloError("Fornecedor não encontrado", "S_ASH_01");
          }
    
          supplier.history.push(historyEntry);
          await supplier.save();
    
          return {
            message: "Histórico do fornecedor adicionado com sucesso",
            status: true,
            id: supplierId,
            supply: historyEntry
          };
        } catch (error) {
          throw new ApolloError(error, "S_ASH_02");
        }
    }

    static async getSupplies() {
        try {
          const supplies = await Supplier.find({}, 'id history');
    
          return supplies.map((supplier) => {
            return {
                id: supplier._id,
                history: supplier.history
            };
          });
        } catch (error) {
          throw new ApolloError(error, "S_GET_01");
        }
    }
}


// aki eu quero exporta nao importar
module.exports = SupplierRepositoryImpl;