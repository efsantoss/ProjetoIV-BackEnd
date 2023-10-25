// run graphql

const { ApolloServer} = require('apollo-server');
const industryTypeDefsImport = require('./src/industry/graphql/schema');
const industryResolversImport = require('./src/industry/repository/IndustryResolver');

const server = new ApolloServer({
    typeDefs: [industryTypeDefsImport],
    resolvers: [industryResolversImport]
})

server.listen().then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`);
  });