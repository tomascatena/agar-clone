import { bindActionCreators } from '@reduxjs/toolkit';
import { settingsActions } from '@/store/features/settings/settingsSlice';
import { useDispatch } from 'react-redux';

const actions = {
  ...settingsActions,
};

export const useActions = (): typeof actions => {
  const dispatch = useDispatch();
  return bindActionCreators(actions, dispatch);
};
