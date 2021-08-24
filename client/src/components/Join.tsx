import React, { useState } from 'react';
import styles from './Join.module.css';

export interface JoinProps {
  onJoin: (author: string, roomId: string) => void;
}

export default function Join(props: JoinProps) {
  const [ author, setAuthor ] = useState('anon');
  const [ roomId, setRoomId ] = useState('demo');

  const onJoin = () => {
    if (author.length === 0 || roomId.length === 0) {
      alert('stahp!');
      return;
    }

    props.onJoin(author, roomId);
  };

  return (
    <div className={styles.container}>
      <div>
        <div><b>Name:</b></div>
        <div>
          <input
            type="text"
            value={author}
            onChange={(event) => setAuthor(event.target.value)}
          />
        </div>
      </div>
      <div>
        <div><b>Room ID:</b></div>
        <div>
          <input
            type="text"
            value={roomId}
            onChange={(event) => setRoomId(event.target.value)}
          />
        </div>
      </div>
      <div>
        <input type="button" value="Join!" onClick={onJoin} />
      </div>
    </div>
  );
}
