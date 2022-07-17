import { IOrb } from '@/typings/typings';
import { settingsActions } from '@/store/features/settings/settingsSlice';
import { store } from '@/store/store';

type HandleInitReturnParams = {
  orbs: IOrb[];
};

export const handleInitReturn = (data: HandleInitReturnParams) => {
  const orbs = data.orbs;

  store.dispatch(settingsActions.setOrbs(orbs));
};
