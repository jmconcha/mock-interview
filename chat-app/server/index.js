const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server, {
  cors: {
    origin: '*',
  },
});

const PORT = 5000;

const randomMessages = [
  'Lorem, ipsum lol dolor.',
  'Lorem, lol ipsum.',
  'Lorem ipsum dolor lol sit amet.',
  'Lorem, ipsum dolor.',
  'Lorem, ipsum.',
  'Lorem ipsum lol dolor sit amet.',
];
const messages = [];

setInterval(() => {
  const randNum = Math.floor(Math.random() * (randomMessages.length - 1));
  messages.push(randomMessages[randNum]);

  console.log('messages: ', messages);
}, 1000);

io.on('connection', (socket) => {
  console.log('a user connected');

  io.emit('chat-message', messages);

  socket.on('chat-message', (msg) => {
    console.log('message', msg);
    messages.push(msg);

    io.emit('chat-message', msg);
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

server.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
