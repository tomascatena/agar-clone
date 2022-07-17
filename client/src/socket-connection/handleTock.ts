import { IPlayerFromServer } from '@/typings/typings';
import { settingsActions } from '@/store/features/settings/settingsSlice';
import { store } from '@/store/store';

type Data = {
  players: IPlayerFromServer[];
};

export const handleTock = (data: Data, socketId: string) => {
  const players = data.players;
  const player = players.find((p) => p.socketId === socketId);

  store.dispatch(settingsActions.setPlayers(players));

  if (player) {
    store.dispatch(settingsActions.setPlayerLocationX(player.playerData.locationX));
    store.dispatch(settingsActions.setPlayerLocationY(player.playerData.locationY));
  }
};
