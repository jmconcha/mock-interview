import { io } from 'socket.io-client';

export const connect = () => {
  const socket = io('http://localhost:5000');

  socket.onAny((type, message) => console.log(type, message));

  return socket;
};
