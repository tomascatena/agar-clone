import { Socket, io } from 'socket.io-client';
import { IOrb, settingsActions } from '@/store/features/settings/settingsSlice';
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
