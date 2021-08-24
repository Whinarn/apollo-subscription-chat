import { ApolloServer } from 'apollo-server';

import resolvers from './resolvers';
import typeDefs from './typeDefs';

interface ConnectionParams {
  authToken?: string;
}

const server = new ApolloServer({
  resolvers,
  typeDefs,
  context: async ({ req, connection }) => {
    if (connection) {
      return connection.context;
    } else {
      const token = req.headers.authorization || '';
      return { token };
    }
  },
  subscriptions: {
    onConnect: (connectionParams: ConnectionParams, _) => {
      // TODO: Validate auth!
      if (connectionParams.authToken) {

      }

      //throw new Error('Missing auth token!');
    }
  }
});

server.listen().then(({url, subscriptionsUrl}) => {
  console.log(`Server ready at ${url}`);
  console.log(`Subscriptions ready at ${subscriptionsUrl}`);
});
