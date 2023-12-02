const SupplierRepository = require('./SupplierRepositoryImpl');

const supplierResolvers = {
    Query: {
      getSupplies: async (_, {}) => {
        const supplies = await SupplierRepository.getSupplies();

        return supplies;
      }
    },

    // aki temos as implementações das mutations
    Mutation: {
        createSupplier: async (_, { supplier }) => {
          const supplierRegistered = await SupplierRepository.registerSupply(
            supplier.email,
            supplier.document,
            supplier.phone,
            supplier.password
          ); 
          
          return supplierRegistered;
        },

        updateSupplierHistory: async (_, { supplyData }) => { 
          const history = await SupplierRepository.addSupplierHistory(
            supplyData.id, 
            {
              address: supplyData.address,
              quantity: supplyData.quantity
            }
          ); 

          return {
            id: history.id,
            quantity: history.supply.quantity,
            address: history.supply.address
          }
        }
    }
  
  };

  module.exports = supplierResolvers;