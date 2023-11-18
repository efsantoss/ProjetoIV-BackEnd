// importando o firebase e o apollo error
const Firebase = require('../../firebase/firebase');
const { ApolloError } = require('apollo-server');
const UserRepository = require('../../user/repository/UserRepositoryImpl')

class SupplierRepositoryImpl {
    static createSupplier(supplier) {
     
        if (supplier.document.length !== 14 && supplier.document.length !== 11) {
            throw new ApolloError("Document is not valid. " + supplier.document, "S_DL_02");
        }
        
        if (supplier.phone.length !== 9) {
            throw new ApolloError("Phone number must be 9 digits. " + supplier.phone, "S_PL_03");
        }
    
        try {
            const firebase = new Firebase();

            UserRepository.createUserWithEmailAndPassword(supplier.email, supplier.password)

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