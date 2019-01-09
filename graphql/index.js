const { ApolloServer } = require("apollo-server-azure-functions");
const requireText = require('require-text');
const typeDefs = requireText('./schema.graphql', require);

const serviceCall = async () => {
  console.log('getting currency');
  return 'USD';
};

const getCurrency = async () => {
  return await serviceCall();
};

const resolvers = {
  Query: {
    getInfo: () => ({
      order: () => {
        console.log('getting order');
        return {
          orderId: 1234,
          amountInCents: 9999,
          currency: getCurrency,
        };
      },
      address: () => {
        console.log('getting address');
        return {
          street: '860 W California Ave',
          zip: 94086,
          state: 'CA',
          city: 'Sunnyvale',
        };
      },
    }),
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

module.exports = server.createHandler();
