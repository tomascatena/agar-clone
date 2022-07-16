import express from 'express';
import { Server } from 'socket.io';

const app = express();

const PORT = process.env.PORT || 5000;

const expressServer = app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

const io = new Server(expressServer);

io.sockets.on('connection', (socket) => {
  console.log('Client connected');

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});
