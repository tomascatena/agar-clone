import React from 'react';
import { connectWithSocketServer } from '@/socketConnection';
import { StyledCanvas } from '@/App.styled';
import { mouseLogic } from '@/canvas-utils/mouseLogic';
import { draw } from '@/canvas-utils/draw';
import { useTypedSelector } from './hooks';

const DEFAULT_PLAYER_NAME = 'Anonymous';

const App: React.FC = () => {
  const [playerName, setPlayerName] = React.useState('');

  const { orbs } = useTypedSelector(state => state.settings);

  React.useEffect(() => {
    connectWithSocketServer();

    setPlayerName(prompt('Enter your name', DEFAULT_PLAYER_NAME) || DEFAULT_PLAYER_NAME);

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
