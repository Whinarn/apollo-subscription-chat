import { useEffect, useState } from 'react';
import { useQuery, gql } from '@apollo/client';
import { find } from 'lodash';
import { Message } from '../models/Message';

const MESSAGES_QUERY = gql`
  query GetMessages($roomId: String!) {
    messages(roomId: $roomId) {
      id
      author
      text
      time
    }
  }
`;

const MESSAGE_ADDED_SUBSCRIPTION = gql`
  subscription MessageAdded($roomId: String!) {
    messageAdded(roomId: $roomId) {
      id
      author
      text
      time
    }
  }
`;

export default function useMessagesQuery(roomId: string) {
  const [ hasSubscribed, setSubscribed ] = useState(false);

  const query = useQuery(MESSAGES_QUERY, {
    variables: {
      roomId
    }
  });

  useEffect(() => {
    if (hasSubscribed) {
      return;
    }

    if (!query.loading && query.data) {
      query.subscribeToMore({
        document: MESSAGE_ADDED_SUBSCRIPTION,
        variables: {
            roomId
        },
        updateQuery: (prev, { subscriptionData }) => {
          if (!subscriptionData.data) {
            return prev;
          }

          const newMessage: Message = subscriptionData.data.messageAdded;
          const existingMessage = find(prev.messages, (message: Message) => message.id === newMessage.id);
          if (existingMessage) {
            return prev;
          }

          return {
            ...prev,
            messages: [
              ...prev.messages,
              newMessage,
            ]
          };
        }
      });

      setSubscribed(true);
    }
  }, [hasSubscribed, query, roomId])

  return query;
}
