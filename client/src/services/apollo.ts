import { ApolloClient, InMemoryCache, HttpLink, split } from '@apollo/client';
import { WebSocketLink } from '@apollo/client/link/ws';
import { getMainDefinition } from '@apollo/client/utilities';

const HOST = '127.0.0.1';

const httpLink = new HttpLink({
  uri: `http://${HOST}:4000`
});

const wsLink = new WebSocketLink({
  uri: `ws://${HOST}:4000/graphql`,
  options: {
    reconnect: true,
    connectionParams: {
      authToken: 'secret'
    }
  }
});

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  httpLink
);

export const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache()
});
