const { ApolloServer } = require("apollo-server-azure-functions");
const requireText = require('require-text');
const typeDefs = requireText('./schema.graphql', require);

const getCurrency = (context) => {
  return async () => {
    context.log('getting currency');
    return 'USD';
  };
};

const resolvers = {
  Query: {
    getInfo: () => ({
      order: (_params, { context, data }, reqInfo) => {
        context.log('getting order');
        context.log(data);
        return {
          orderId: 1234,
          amountInCents: 9999,
          currency: getCurrency(context),
        };
      },
      address: (_params, { context, data }, reqInfo) => {
        context.log('getting address');
        context.log(data);
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

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ctx => ({ context: ctx.context, data: 'hello' }),
});

module.exports = server.createHandler();
