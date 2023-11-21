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

        if (supplier.password.length < 6) {
            throw new ApolloError("Password must be 6 or more digits. ", "I_PL_04");
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

    static supplyHistoryUpdate(supplyInfo) {
        console.log(supplyInfo);

        if (supplyInfo.address.length == "") {
            throw new ApolloError("Address is not valid. " + supplyInfo.address, "S_ADL_04");
        }

        if (supplyInfo.quantity.length == 0 && supplyInfo.quantity.length < 0) {
            throw new ApolloError("Quantity is not valid. " + supplyInfo.quantity, "S_QTL_05")
        }
        
        if (supplyInfo.document.length !== 14 && supplyInfo.document.length !== 11) {
            throw new ApolloError("Document is not valid. " + supplyInfo.document, "S_DL_06");
        }

        try {
            const firebase = new Firebase();

            firebase.saveData(
                'suppliers/' +  supplyInfo.document + '/history/' + supplyInfo.id, supplyInfo
            );

            return supplyInfo;
        } catch (error) {
            throw new ApolloError(error, 'SUPPLY_DATA_NOT_SAVED');
        }
    };
}

// aki eu quero exporta nao importar
module.exports = SupplierRepositoryImpl;