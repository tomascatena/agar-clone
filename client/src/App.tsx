import React from 'react';
import { connectWithSocketServer } from '@/socketConnection';
import { StyledCanvas } from './App.styled';
import { mouseLogic } from './canvasUtils/mouseLogic';
import { draw } from './canvasUtils/draw';

const App: React.FC = () => {
  const [playerName, setPlayerName] = React.useState('');

  React.useEffect(() => {
    connectWithSocketServer();

    setPlayerName(prompt('Enter your name', 'Player') || 'Player');

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
