import React from 'react';
import Join from '../components/Join';

export default function JoinPage() {
  const onJoin = (author: string, roomId: string) => {
    sessionStorage.setItem('author', author);
    window.location.href = `/${encodeURIComponent(roomId)}`;
  };

  return (
    <Join onJoin={onJoin} />
  );
}
