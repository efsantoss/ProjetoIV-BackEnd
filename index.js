// run graphql

const { ApolloServer} = require('apollo-server');
const industryTypeDefsImport = require('./src/industry/graphql/schema');
const industryResolversImport = require('./src/industry/repository/IndustryResolver');
const userTypeDefsImport = require('./src/user/graphql/schema');
const userResolversImport = require('./src/user/repository/UserResolvers');

const server = new ApolloServer({
    typeDefs: [industryTypeDefsImport, userTypeDefsImport],
    resolvers: [industryResolversImport, userResolversImport]
})

server.listen().then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`);
  });