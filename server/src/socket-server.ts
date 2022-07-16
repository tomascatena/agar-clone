import { Server as SocketIOServer } from 'socket.io';
import http from 'http';
import { Orb } from '@/classes/Orb';

let orbs: Orb[] = [];

const initGame = () => {
  orbs = [];
  for (let i = 0; i < 500; i++) {
    orbs.push(new Orb());
  }
};

export const registerSocketServer = (server: http.Server) => {
  const io = new SocketIOServer(server, {
    cors: {
      origin: '*',
      methods: [],
    },
  });

  initGame();

  io.on('connection', (socket) => {
    console.log('Client connected');

    socket.emit('init', { orbs });

    socket.on('disconnect', () => {
      console.log('Client disconnected');
    });
  });
};
