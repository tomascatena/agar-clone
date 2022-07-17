import { BootstrapDialog } from './CustomDialog.sytled';
import { Box } from '@mui/material';
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import React from 'react';
import TextField from '@mui/material/TextField';

type Props = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setHasJoinedGame: (arg: boolean) => void;
};

const CustomDialog: React.FC<Props> = ({
  open,
  setOpen,
  setHasJoinedGame
}) => {
  const [name, setName] = React.useState('');

  const handleClose = () => {
    if (name.trim().length > 0) {
      setOpen(false);
      setHasJoinedGame(true);
    }
  };

  return (
    <BootstrapDialog
      onClose={() => { }}
      aria-labelledby="customized-dialog-title"
      open={open}
    >
      <DialogTitle
        sx={{
          m: 0,
          p: 2,
          fontSize: '2rem',
          textAlign: 'center'
        }}
      >
        Agar Clone
      </DialogTitle>

      <DialogContent dividers>
        <Box
          sx={{
            padding: '1rem 0',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.5rem',
          }}
        >
          <TextField
            autoFocus
            id="outlined-basic"
            label="Player Name"
            placeholder='Enter the name of your player'
            variant="outlined"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <Button
            variant='contained'
            onClick={handleClose}
          >
            Play As Guest
          </Button>
        </Box>
      </DialogContent>

      <DialogActions
        sx={{
          padding: '3rem',
        }}
      >
        <Box
          sx={{
            padding: '0.7rem',
          }}
        >
          <label>How to play:</label>

          <ul>
            <li>Move your mouse on the screen to move your character.</li>
            <li>Absorb orbs by running over them in order to grow your character.</li>
            <li>The larger you get the slower you are.</li>
            <li>Objective: Absorb other players to get even larger but not lose speed.</li>
            <li>The larger player absorbs the smaller player.</li>
          </ul>
        </Box>
      </DialogActions>
    </BootstrapDialog>
  );
};

export default CustomDialog;
