import React, { useState } from 'react';
import useAddMessageMutation from '../hooks/useAddMessageMutation';
import styles from './MessageBar.module.css';

export interface MessageBarProps {
  roomId: string;
  author: string;
}

export default function MessageBar(props: MessageBarProps) {
  const [ text, setText ] = useState('');
  const [ addMessage ] = useAddMessageMutation(props.roomId, props.author);

  const onMessageSend = () => {
    addMessage({
      variables: {
        roomId: props.roomId,
        author: props.author,
        text
      }
    });
  };

  const onTextChanged: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    setText(event.target.value);
  };

  const onKeyDown: React.KeyboardEventHandler = (event) => {
    if (event.key === 'Enter') {
      onMessageSend();
      setText('');
    }
  };

  return (
    <div className={styles.container}>
      <input
        type="text"
        className={styles.text}
        value={text}
        onChange={onTextChanged}
        onKeyDown={onKeyDown}
      />
      <input
        type="button"
        className={styles.button}
        value="Send!"
        onClick={onMessageSend}
      />
    </div>
  );
}
