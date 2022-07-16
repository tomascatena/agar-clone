import { Server as SocketIOServer } from 'socket.io';
import http from 'http';

export const registerSocketServer = (server: http.Server) => {
  const io = new SocketIOServer(server, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST'],
    },
  });

  io.on('connection', (socket) => {
    console.log('Client connected');

    socket.on('disconnect', () => {
      console.log('Client disconnected');
    });
  });
};
