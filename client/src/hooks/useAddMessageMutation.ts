import { useMutation, gql } from '@apollo/client';

const ADD_MESSAGE_MUTATION = gql`
  mutation AddMessage($roomId: String!, $author: String!, $text: String!) {
    addMessage(roomId: $roomId, author: $author, text: $text) {
      id
    }
  }
`;

export default function useAddMessageMutation(roomId: string, author: string) {
  return useMutation(ADD_MESSAGE_MUTATION, {
    variables: {
      roomId,
      author,
      text: ''
    }
  });
}
