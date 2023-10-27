// funções relacionadas ao usuario

const UserRepository = require('./UserRepositoryImpl')

const userResolvers = {
    Mutation: {
        signInWithEmailAndPassword: async(_, { email, password }) => {
            return UserRepository.signInWithEmailAndPassword(email, password)
        },

        createUserWithEmailAndPassword: async(_, { email, password }) => {
            return UserRepository.createUserWithEmailAndPassword(email, password)
        },
    }

};

module.exports = userResolvers;