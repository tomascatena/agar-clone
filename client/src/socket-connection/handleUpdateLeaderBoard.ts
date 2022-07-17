import { ILeaderBoard } from '@/typings/typings';
import { settingsActions } from '@/store/features/settings/settingsSlice';
import { store } from '@/store/store';

type Data = {
  leaderBoard: ILeaderBoard;
};

export const handleUpdateLeaderBoard = (data: Data) => {
  store.dispatch(settingsActions.setLeaderBoard(data.leaderBoard));
};
