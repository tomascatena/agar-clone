import { Server as SocketIOServer } from 'socket.io';
import http from 'http';
import { Orb } from '@/classes/Orb';
import { PlayerConfig } from '@/classes/PlayerConfig';
import { PlayerData } from '@/classes/PlayerData';
import { Player } from '@/classes/Player';
import { gameSettings } from '@/gameSettings';
import checkCollisions from '@/utils/checkCollisions';
import { getLeaderBoard } from '@/utils/getLeaderBoard';

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
    });

    socket.on('tick', (data) => {
      const { xVector, yVector } = data;

      if (player) {
        const { locationX, locationY } = player.playerData;
        const { speed } = player.playerConfig;

        player.playerConfig.xVector = xVector;
        player.playerConfig.yVector = yVector;

        if (
          (locationX < 5 && xVector < 0) ||
          (locationX > gameSettings.worldWidth && xVector > 0)
        ) {
          player.playerData.locationY = locationY - speed * yVector;
        } else if (
          (locationY < 5 && yVector > 0) ||
          (locationY > gameSettings.worldHeight && yVector < 0)
        ) {
          player.playerData.locationX = locationX + speed * xVector;
        } else {
          player.playerData.locationX = locationX + speed * xVector;
          player.playerData.locationY = locationY - speed * yVector;
        }

        const capturedOrb = checkCollisions.checkForOrbCollisions({
          playerData: player.playerData,
          playerConfig: player.playerConfig,
          orbs,
          settings: gameSettings,
        });

        capturedOrb
          .then((data) => {
            const orbData = {
              orbIndex: data,
              newOrb: orbs[data],
            };

            // Emit to all sockets the orb to replace
            io.emit('orb-captured', orbData);

            // Every socket needs to know that the leader board has changed
            io.emit('update-leader-board', { leaderBoard: getLeaderBoard(players) });
          })
          .catch(() => {});

        const playerDeath = checkCollisions.checkForPlayerCollisions({
          playerData: player.playerData,
          playerConfig: player.playerConfig,
          players: players,
          playerId: player.socketId,
        });

        playerDeath
          .then((data) => {
            if (data) {
              // Emit to all sockets the player to remove
              io.emit('player-captured', data);

              // Every socket needs to know that the leader board has changed
              io.emit('update-leader-board', { leaderBoard: getLeaderBoard(players) });
            }
          })
          .catch(() => {});
      }
    });

    socket.on('disconnect', () => {
      players.delete(socket.id);
    });
  });
};
