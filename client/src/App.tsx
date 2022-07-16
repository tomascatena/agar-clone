import React from 'react';
import { connectWithSocketServer, initGame } from '@/socket-connection/socketConnection';
import { StyledCanvas } from '@/App.styled';
import { mouseLogic } from '@/canvas-utils/mouseLogic';
import { draw } from '@/canvas-utils/draw';
import { useActions, useTypedSelector } from './hooks';

const DEFAULT_PLAYER_NAME = 'Anonymous';

const App: React.FC = () => {
  const { orbs } = useTypedSelector(state => state.settings);
  const { setPlayerName } = useActions();

  React.useEffect(() => {
    connectWithSocketServer();

    setPlayerName(prompt('Enter your name', DEFAULT_PLAYER_NAME) || DEFAULT_PLAYER_NAME);

    initGame();

    const canvas = document.getElementById('game-canvas') as HTMLCanvasElement;

    const context = canvas.getContext('2d');

    if (context) {
      canvas.addEventListener('mousemove', (event) => {
        mouseLogic(event, canvas);
      });

      draw(context);
    }
  }, []);

  return (
    <>
      <StyledCanvas
        width={window.innerWidth}
        height={window.innerHeight}
        id='game-canvas'
      ></StyledCanvas>
    </>
  );
};

export default App;
