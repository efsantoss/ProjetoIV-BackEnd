// Realização das funções no banco de dados

const Firebase = require('../../firebase/firebase');
const { ApolloError } = require('apollo-server');
const userErrorCodes = require('../domain/exception/UserErrorCodes');

class UserRepositoryImpl {
    static createUserWithEmailAndPassword(email, password) {
        try {
          const firebase = new Firebase();
    
          const result = firebase.createUser(email, password);
    
          return result;
        } catch (error) {
          throw new ApolloError(
            error,
            userErrorCodes.CREATE_USER_WITH_EMAIL_AND_PASSWORD_ERROR_CODE
          );
        }
      }
    
      static signInWithEmailAndPassword(email, password) {
        try {
          const firebase = new Firebase();
    
          const result = firebase.signIn(email, password);
    
          return result;
        } catch (error) {
          throw new ApolloError(
            error,
            userErrorCodes.SIGN_IN_WITH_EMAIL_AND_PASSWORD_ERROR_CODE
          );
        }
      };
}

module.exports = UserRepositoryImpl;