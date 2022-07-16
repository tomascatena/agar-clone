import { Server as SocketIOServer } from 'socket.io';
import http from 'http';
import { Orb } from '@/classes/Orb';
import { PlayerPrivateConfig } from '@/classes/PlayerPrivateConfig';
import { PlayerPublicData } from '@/classes/PlayerPublicData';
import { Player } from '@/classes/Player';
import { gameSettings } from '@/gameSettings';

let orbs: Orb[] = [];

const startGame = () => {
  orbs = [];
  for (let i = 0; i < gameSettings.defaultOrbs; i++) {
    orbs.push(new Orb(gameSettings));
  }
};

export const registerSocketServer = (server: http.Server) => {
  const io = new SocketIOServer(server, {
    cors: {
      origin: '*',
      methods: [],
    },
  });

  startGame();

  io.on('connection', (socket) => {
    console.log('Player connected');

    let playerPrivateConfig = new PlayerPrivateConfig(gameSettings);
    let playerPublicData = new PlayerPublicData(socket.id, gameSettings);
    let player = new Player(socket.id, playerPrivateConfig, playerPublicData);

    socket.emit('init', { orbs });

    socket.on('disconnect', () => {
      console.log('Player disconnected');
    });
  });
};
