// importando o firebase e o apollo error
const Firebase = require('../../firebase/firebase');
const { ApolloError } = require('apollo-server');

class SupplierRepositoryImpl {
    static createSupplier(supplier) {
        if (supplier.document.length !== 14) {
            throw new ApolloError(
              "Document is not valid. " + supplier.document, "S_DL_01");
          }

        if (supplier.document.length !== 11) {
            throw new ApolloError(
              "Document is not valid. " + supplier.document, "S_DL_01");
          }
      
        if (supplier.phone.length !== 9) {
            throw new ApolloError("Phone number must be 9 digits. " + supplier.phone, "S_PL_02");
        }
    
        try {
            const firebase = new Firebase();

            firebase.saveData(
                'suppliers/' + supplier.document, supplier
            );
    
            return supplier;
        } catch (error) {
            throw new ApolloError(error, 'DATA_NOT_SAVED');;
        }
    }; 
}


// aki eu quero exporta nao importar
module.exports = SupplierRepositoryImpl;