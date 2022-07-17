import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';

export const StyledLeaderBoard = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: '0',
  right: '0',
  color: '#fff',
  backgroundColor: 'rgba(255, 0, 0, 0.25)',
  borderRadius: theme.spacing(1),
  padding: theme.spacing(2),
  margin: theme.spacing(2),
  minWidth: '15rem',
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),
  alignItems: 'center',
}));
