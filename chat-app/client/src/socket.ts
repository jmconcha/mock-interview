import { io } from 'socket.io-client';

export const connect = () => {
  const socket = io('http://localhost:5000');

  return socket;
};
