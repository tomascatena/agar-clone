import { IOrb } from '@/typings/typings';
import { settingsActions } from '@/store/features/settings/settingsSlice';
import { store } from '@/store/store';

type Data = {
  orbIndex: number;
  newOrb: IOrb;
};

export const handleOrbCaptured = (data: Data) => {
  const { orbIndex, newOrb } = data;

  store.dispatch(settingsActions.updateOrbs({ orbIndex, newOrb }));
};
