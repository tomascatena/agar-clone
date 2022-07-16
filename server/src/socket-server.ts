import { Server as SocketIOServer } from 'socket.io';
import http from 'http';
import { Orb } from '@/classes/Orb';
import { PlayerConfig } from '@/classes/PlayerConfig';
import { PlayerData } from '@/classes/PlayerData';
import { Player } from '@/classes/Player';
import { gameSettings } from '@/gameSettings';

let orbs: Orb[] = [];
let players = new Map<string, Player>();

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

  setInterval(() => {
    io.to('game').emit('tock', {
      players: [...players.values()],
    });
  }, 33); // 33ms = 30fps, 1/30 = 0.033s

  io.on('connection', (socket) => {
    let player: Player | undefined;

    socket.on('init', (data) => {
      // Add the player to the game namespace
      socket.join('game');

      const playerName = data.playerName as string;

      let playerConfig = new PlayerConfig(gameSettings);
      let playerData = new PlayerData(playerName, gameSettings);
      player = new Player(socket.id, playerConfig, playerData);

      socket.emit('initReturn', { orbs });

      players.set(socket.id, player);

      console.log('player connected', players);
    });

    socket.on('tick', (data) => {
      const { xVector, yVector } = data;

      if (player) {
        const { locationX, locationY } = player.playerData;
        const { speed } = player.playerConfig;

        player.playerConfig.xVector = xVector;
        player.playerConfig.yVector = yVector;

        if ((locationX < 5 && xVector < 0) || (locationX > 500 && xVector > 0)) {
          player.playerData.locationY = locationY - speed * yVector;
        } else if ((locationY < 5 && yVector > 0) || (locationY > 500 && yVector < 0)) {
          player.playerData.locationX = locationX + speed * xVector;
        } else {
          player.playerData.locationX = locationX + speed * xVector;
          player.playerData.locationY = locationY - speed * yVector;
        }
      }
    });

    socket.on('disconnect', () => {
      players.delete(socket.id);
    });
  });
};
