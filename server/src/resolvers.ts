import { v4 as uuidv4 } from 'uuid';
import { Message } from './models/messages';
import {
  getMessages,
  getMessageAddedAsyncIterator,
  sendMessage,
  initialSetup
} from './services/messages';

interface MessagesArgs {
  roomId: string;
}

interface MessageAddedArgs {
  roomId: string;
}

interface AddMessageArgs {
  roomId: string;
  author: string;
  text: string;
}

export default {
  Query: {
    messages: async (_root: unknown, args: MessagesArgs) => await getMessages(args.roomId),
  },
  Subscription: {
    messageAdded: {
      subscribe: (_root: unknown, args: MessageAddedArgs) => getMessageAddedAsyncIterator(args.roomId),
    },
  },
  Mutation: {
    async initialSetup() {
      await initialSetup();
      return true;
    },
    async addMessage(_root: unknown, args: AddMessageArgs) {
      const message: Message = {
        id: uuidv4(),
        author: args.author,
        text: args.text,
        time: Date.now()
      };
      await sendMessage(args.roomId, message);
      return message;
    }
  }
};
