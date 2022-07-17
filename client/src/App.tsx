import { MainContainer, StyledCanvas } from '@/App.styled';
import { connectWithSocketServer, initGame } from '@/socket-connection/socketConnection';
import { draw } from '@/canvas-utils/draw';
import { mouseLogic } from '@/canvas-utils/mouseLogic';
import { useActions, useTypedSelector } from './hooks';
import CustomDialog from './components/CustomDialog/CustomDialog';
import LeadersBoard from '@/components/LeaderBoard/LeaderBoard';
import React from 'react';

const App: React.FC = () => {
  const [openDialog, setOpenDialog] = React.useState(true);

  const { setHasJoinedGame, setPlayerName } = useActions();

  const { hasJoinedGame, leaderBoard } = useTypedSelector((state) => state.settings);

  React.useEffect(() => {
    if (hasJoinedGame) {
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
  }, [hasJoinedGame]);

  return (
    <MainContainer>
      <StyledCanvas
        width={window.innerWidth}
        height={window.innerHeight}
        id='game-canvas'
      ></StyledCanvas>

      <CustomDialog
        open={openDialog}
        setOpen={setOpenDialog}
        setHasJoinedGame={setHasJoinedGame}
        setPlayerName={setPlayerName}
      />

      {hasJoinedGame && <LeadersBoard leaderBoard={leaderBoard} />}
    </MainContainer>
  );
};

export default App;
