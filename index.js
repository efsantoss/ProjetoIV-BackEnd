// run graphql
// iniciar o servidor do apollo ( gerenciador do graphql (tipo um node))
const { ApolloServer} = require('apollo-server');
const industryTypeDefsImport = require('./src/industry/graphql/schema');
const industryResolversImport = require('./src/industry/repository/IndustryResolver');
const supplierTypeDefsImport = require('./src/supplier/graphql/schema');
const supplierResolversImport = require('./src/supplier/repository/SupplierResolver');
const userTypeDefsImport = require('./src/user/graphql/schema');
const userTypeResolversImport = require('./src/user/repository/UserResolver');

const mongoose = require('mongoose');

const uri = "mongodb+srv://admin:admin@energy-match-cluster.mkuo6si.mongodb.net/Energy_Match?retryWrites=true&w=majority";

mongoose.connect(uri);

//definindo o servidor
const server = new ApolloServer({
    //passando o schema ( inputs, querys e mutations e types)
    typeDefs: [industryTypeDefsImport, supplierTypeDefsImport, userTypeDefsImport],
    //funcoes do graphql
    resolvers: [industryResolversImport,supplierResolversImport, userTypeResolversImport]
})
// iniciar o servidor
server.listen().then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`);
});