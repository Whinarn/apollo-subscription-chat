import { gql } from 'apollo-server';

export default gql`
  type Query {
    messages(roomId: String!): [Message!]
  }

  type Subscription {
    messageAdded(roomId: String!): Message!
  }

  type Mutation {
    initialSetup: Boolean
    addMessage(roomId: String!, author: String!, text: String!): Message!
  }

  type Message {
    id: String!
    author: String!
    text: String!
    time: Float!
  }
`;
