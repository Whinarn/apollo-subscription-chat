import React from 'react';
import { useParams } from 'react-router-dom';
import MessageList from '../components/MessageList';
import MessageBar from '../components/MessageBar';

interface RoomParams {
  roomId: string;
}

export default function RoomPage() {
  const { roomId } = useParams<RoomParams>();
  const author = sessionStorage.getItem('author') || 'anon';

  return (
    <div>
      <MessageList roomId={roomId} />
      <MessageBar roomId={roomId} author={author} />
    </div>
  );
}
