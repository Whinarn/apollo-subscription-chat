import React from 'react';
import { Message } from '../models/Message';
import styles from './MessageEntry.module.css';

export interface MessageEntryProps {
  message: Message
}

export default function MessageEntry(props: MessageEntryProps) {
  return (
    <div className={styles.container}>
      <div className={styles.sender}>
        {props.message.author} @ {new Date(props.message.time).toLocaleString()}
      </div>
      <div className={styles.text}>
        {props.message.text}
      </div>
    </div>
  );
}
