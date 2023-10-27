// run graphql
// iniciar o servidor do apollo ( gerenciador do graphql (tipo um node))
const { ApolloServer} = require('apollo-server');
const industryTypeDefsImport = require('./src/industry/graphql/schema');
const industryResolversImport = require('./src/industry/repository/IndustryResolver');
const userTypeDefsImport = require('./src/user/graphql/schema');
const userResolversImport = require('./src/user/repository/UserResolvers');
const supplierTypeDefsImport = require('./src/supplier/graphql/schema');
const supplierResolversImport = require('./src/supplier/repository/SupplierResolver');


//definindo o servidor
const server = new ApolloServer({
    //passando o schema ( inputs, querys e mutations e types)
    typeDefs: [industryTypeDefsImport, userTypeDefsImport, supplierTypeDefsImport],
    //funcoes do graphql
    resolvers: [industryResolversImport, userResolversImport,supplierResolversImport]
})
// iniciar o servidor
server.listen().then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`);
});


//type def: eh o schema
//resolvers: arquivo de resolvers