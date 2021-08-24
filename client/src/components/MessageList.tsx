import React from 'react';
import { map, orderBy } from 'lodash';
import MessageEntry from './MessageEntry';
import { Message } from '../models/Message';
import useMessagesQuery from '../hooks/useMessagesQuery';
import styles from './MessageList.module.css';

export interface MessageListProps {
  roomId: string;
}

export default function MessageList(props: MessageListProps) {
  const { loading, error, data } = useMessagesQuery(props.roomId);

  if (loading) {
    return <div>Loading...</div>;
  } else if (error) {
    return <div>Error! 😞</div>;
  }

  const messages: Message[] = orderBy(data.messages, 'time', 'desc') || [];
  const messageElements = map(
    messages,
    (message) => <MessageEntry key={message.id} message={message} />
  );
  return (
    <div className={styles.container}>
      {messageElements}
    </div>
  );
};
