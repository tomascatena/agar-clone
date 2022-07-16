import { createSlice } from '@reduxjs/toolkit';

export interface SettingsState {}

export const initialState: SettingsState = {};

export const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {},
  extraReducers: () => {},
});

export const settingsActions = settingsSlice.actions;

export default settingsSlice.reducer;
