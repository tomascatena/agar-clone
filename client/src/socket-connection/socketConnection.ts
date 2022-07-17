import { Socket, io } from 'socket.io-client';
import { handleInitReturn } from './handleInitReturn';
import { handleOrbCaptured } from './handleOrbCaptured';
import { handleTock } from './handleTock';
import { handleUpdateLeaderBoard } from './handleUpdateLeaderBoard';
import { store } from '@/store/store';

let socket: Socket;

/**
 * @desc Connect with the socket server.
 */
export const connectWithSocketServer = () => {
  socket = io('http://localhost:5000');

  socket.on('initReturn', (data) => {
    handleInitReturn(data);

    setInterval(() => {
      socket.emit('tick', {
        xVector: store.getState().settings.player.xVector,
        yVector: store.getState().settings.player.yVector,
      });
    }, 33); // 33ms = 30fps, 1/30 = 0.033s
  });

  socket.on('tock', (data) => {
    handleTock(data, socket.id);
  });

  socket.on('orb-captured', (data) => {
    handleOrbCaptured(data);
  });

  socket.on('player-captured', (data) => {
    console.log('player-captured', data);
  });

  socket.on('update-leader-board', (data) => {
    handleUpdateLeaderBoard(data);
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
