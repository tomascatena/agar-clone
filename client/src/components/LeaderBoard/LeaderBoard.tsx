import { ILeaderBoard } from '@/typings/typings';
import { StyledLeaderBoard } from './LeaderBoard.styled';
import { Typography } from '@mui/material';
import Divider from '@mui/material/Divider';
import React from 'react';

type Props = {
  leaderBoard: ILeaderBoard;
};

const LeadersBoard: React.FC<Props> = ({ leaderBoard }) => {
  return (
    <StyledLeaderBoard>
      <div>
        <Typography
          variant='h4'
          textAlign='center'
        >
          Leaders
        </Typography>

        <Typography
          variant='body2'
          textAlign='center'
        >
          {
            leaderBoard.length > 0
              ? `Top 10 players (${leaderBoard.length} players)`
              : 'No players yet'
          }
        </Typography>
      </div>

      <Divider sx={{ backgroundColor: '#fff', width: '100%' }} />

      <ol>
        {
          leaderBoard.length > 0
            ? leaderBoard.slice(0, 10).map((leader, index) =>
              <Typography
                key={index}
                variant='h6'
              >
                <li>
                  {leader.name} - {leader.score} pts
                </li>
              </Typography>
            ) : 'No players yet'
        }
      </ol >
    </StyledLeaderBoard >
  );
};

export default LeadersBoard;
