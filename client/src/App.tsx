import React from 'react';
import { connectWithSocketServer } from '@/socketConnection';
import { StyledCanvas } from './App.styled';

const App: React.FC = () => {
  const [playerName, setPlayerName] = React.useState('');

  React.useEffect(() => {
    console.log('App.tsx');
    connectWithSocketServer();

    setPlayerName(prompt('Enter your name', 'Player') || 'Player');

    const canvas = document.getElementById('game-canvas') as HTMLCanvasElement;

    const ctx = canvas.getContext('2d');

    console.log(ctx);
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
