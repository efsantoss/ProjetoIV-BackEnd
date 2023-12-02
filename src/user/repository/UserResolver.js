const UserRepositoryImpl = require('./UserRepositoryImpl');

const supplierResolvers = {
    Query: {
        userLogIn: async (_, { userInput }) => {
            const result = UserRepositoryImpl.login(userInput.email, userInput.password);
            
            return result; 
      }
    }
  };

  module.exports = supplierResolvers;