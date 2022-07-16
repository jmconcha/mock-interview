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

const messages = [
  'Lorem, ipsum lol dolor.',
  'Lorem, lol ipsum.',
  'Lorem ipsum dolor lol sit amet.',
  'Lorem, ipsum dolor.',
  'Lorem, ipsum.',
  'Lorem ipsum lol dolor sit amet.',
];
const colors = ['red', 'blue', 'green', 'pink'];
const usernames = ['Lebron', 'Michael', 'Shan', 'Judith'];

const randomMessages = [];

io.on('connection', (socket) => {
  console.log('a user connected');

  const intervalId = setInterval(() => {
    randomMessages.push({
      body: messages[getRandomNumber(0, messages.length)],
      user: {
        name: usernames[getRandomNumber(0, usernames.length)],
        color: colors[getRandomNumber(0, colors.length)],
      },
    });

    console.log('messages: ', randomMessages);

    io.emit('chat-message', randomMessages);
  }, 1000);

  io.emit('chat-message', randomMessages);

  socket.on('chat-message', (msg) => {
    console.log('message', msg);
    randomMessages.push(msg);

    io.emit('chat-message', msg);
  });

  socket.on('disconnect', () => {
    clearInterval(intervalId);

    console.log('user disconnected');
  });
});

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

server.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
