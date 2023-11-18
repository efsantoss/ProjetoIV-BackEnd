
const Supplier = require('../model/Supplier');
const SupplierRepository = require('./SupplierRepositoryImpl');
//require para importa o arquivo


const supplierResolvers = {
    // aki temos as implementações das mutations
    Mutation: {
        createSupplier: async (_, { supplier }) => {
            const supplierData = new Supplier({
                email: supplier.email,
                document: supplier.document,
                phone: supplier.phone,
                password: supplier.password
              });
            // aki estamos chamando a função createSupplier com o parametro supplierData
            return SupplierRepository.createSupplier(supplierData); 
        }
    }
  
  };



  module.exports = supplierResolvers;