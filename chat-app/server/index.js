const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server);

const PORT = process.env.PORT || 8000;

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('chatMessage', (msg) => {
    console.log('message', msg);

    io.emit('chatMessage', msg);
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

server.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
