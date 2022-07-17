import { Player } from '@/classes/Player';

export const getLeaderBoard = (players: Map<string, Player>) => {
  // Sort players in descending order by their score
  const sortedPlayers = [...players.values()].sort((a, b) => {
    return b.playerData.score - a.playerData.score;
  });

  const leaderBoard = sortedPlayers.map((player) => {
    return {
      name: player.playerData.name,
      score: player.playerData.score,
    };
  });

  return leaderBoard;
};
