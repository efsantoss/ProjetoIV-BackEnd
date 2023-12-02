const bcrypt = require('bcrypt');
const { ApolloError } = require('apollo-server');
const userErrorCodes = require('../domain/exception/UserErrorCodes');

// Importando o modelo User
const User = require('../mongo/User');

class UserRepositoryImpl {
    
  static async signUp(email, password) {
    try {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        throw new ApolloError("Esse Usuário já existe " + "id: " + existingUser._id, "U_SP_01");
      }

      const newUser = new User(
        { email, password }
      );
      await newUser.save();

      return {
        message: "Usuario criado com sucesso",
        status: true,
        id: newUser._id
      };
    } catch (error) {
      throw new ApolloError(error, "U_SP_02");
    }
  }

  static async login(email, password) {
    try {
      const user = await User.findOne({ email });

      if (!user) {
        throw new ApolloError("Usuário não encontrado", "U_LG_01");
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        throw new ApolloError("Credenciais inválidas", "U_LG_02");
      }

      return {
        message: "Login bem-sucedido",
        status: true,
        id: user._id
      };
    } catch (error) {
      throw new ApolloError(error, "U_LG_03");
    }
  }
}

module.exports = UserRepositoryImpl;