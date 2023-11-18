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
            throw new ApolloError(error, 'DATA_NOT_SAVED');
        }
    }; 
    static supplyHistoryUpdate(supplyData) {
        console.log(supplyData);

        if (supplyData.address.length == "") {
            throw new ApolloError("Address is not valid. " + supplyData.address, "S_ADL_04");
        }
        if (supplyData.quantity.length == 0 && supplyData.quantity.length < 0) {
            throw new ApolloError("Quantity is not valid. " + supplyData.quantity, "S_QTL_05")
        }
        if (supplyData.document.length !== 14 && supplyData.document.length !== 11) {
            throw new ApolloError("Document is not valid. " + supplyData.document, "S_DL_06");
        }

        try {
            const firebase = new Firebase();

            firebase.saveData(
                'suppliers/' +  supplyData.document + '/history/' + supplyData.id, supplyData
            );

            return supplyData;
        } catch (error) {
            throw new ApolloError(error, 'SUPPLY_DATA_NOT_SAVED');
        }
    };
}


// aki eu quero exporta nao importar
module.exports = SupplierRepositoryImpl;