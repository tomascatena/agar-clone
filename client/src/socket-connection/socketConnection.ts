import { Socket, io } from 'socket.io-client';
import { IOrb, IPlayerFromServer, settingsActions } from '@/store/features/settings/settingsSlice';
import { store } from '@/store/store';

let socket: Socket;

/**
 * @desc Connect with the socket server.
 */
export const connectWithSocketServer = () => {
  socket = io('http://localhost:5000');

  socket.on('connect', () => {
    console.log('Connected to socket server');
  });

  socket.on('initReturn', (data) => {
    const orbs = data.orbs as IOrb[];

    store.dispatch(settingsActions.setOrbs(orbs));

    setInterval(() => {
      socket.emit('tick', {
        xVector: store.getState().settings.player.xVector,
        yVector: store.getState().settings.player.yVector,
      });
    }, 33); // 33ms = 30fps, 1/30 = 0.033s
  });

  socket.on('tock', (data) => {
    const players = data.players as IPlayerFromServer[];
    const player = players.find((p) => p.socketId === socket.id);

    store.dispatch(settingsActions.setPlayers(players));

    if (player) {
      store.dispatch(settingsActions.setPlayerLocationX(player.playerData.locationX));
      store.dispatch(settingsActions.setPlayerLocationY(player.playerData.locationY));
    }
  });

  socket.on('orb-captured', (data) => {
    console.log('orb-captured', data);

    const orbIndex = data.orbIndex as number;
    const newOrb = data.newOrb as IOrb;

    store.dispatch(settingsActions.updateOrbs({ orbIndex, newOrb }));
  });

  socket.on('player-captured', (data) => {
    console.log('player-captured', data);
  });

  socket.on('connect_error', (err) => {
    console.error(err);
  });
};

export const initGame = () => {
  socket.emit('init', {
    playerName: store.getState().settings.player.name,
  });
};
