import { StyledCanvas } from '@/App.styled';
import { connectWithSocketServer, initGame } from '@/socket-connection/socketConnection';
import { draw } from '@/canvas-utils/draw';
import { mouseLogic } from '@/canvas-utils/mouseLogic';
import { useActions, useTypedSelector } from './hooks';
import CustomDialog from './components/CustomDialog/CustomDialog';
import React from 'react';

const App: React.FC = () => {
  const [openDialog, setOpenDialog] = React.useState(true);

  const { setPlayerName } = useActions();
  const { playerName } = useTypedSelector((state) => state.settings);

  React.useEffect(() => {
    if (playerName) {
      connectWithSocketServer();

      initGame();

      const canvas = document.getElementById('game-canvas') as HTMLCanvasElement;

      const context = canvas.getContext('2d');

      if (context) {
        canvas.addEventListener('mousemove', (event) => {
          mouseLogic(event, canvas);
        });

        draw(context);
      }
    }
  }, [playerName]);

  return (
    <>
      <StyledCanvas
        width={window.innerWidth}
        height={window.innerHeight}
        id='game-canvas'
      ></StyledCanvas>

      <CustomDialog
        open={openDialog}
        setOpen={setOpenDialog}
        setPlayerName={setPlayerName}
      />
    </>
  );
};

export default App;
