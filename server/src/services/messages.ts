import { Message } from '../models/messages';
import { getAsyncIterator, publish } from './pubsub';
import * as messageRepo from '../repositories/messages';

export async function initialSetup(): Promise<void> {
  return await messageRepo.createTables();
}

export async function getMessages(roomId: string): Promise<Message[]> {
  return await messageRepo.getMessages(roomId);
}

export function getMessageAddedAsyncIterator(roomId: string): AsyncIterator<Message> {
  const trigger = `MESSAGE_ADDED:${roomId}`;
  return getAsyncIterator<Message>([trigger]);
}

export async function sendMessage(roomId: string, message: Message): Promise<void> {
  await messageRepo.createMessage(roomId, message);

  const trigger = `MESSAGE_ADDED:${roomId}`;
  publish(trigger, {
    messageAdded: message
  });
}
