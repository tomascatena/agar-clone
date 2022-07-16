import { createSlice } from '@reduxjs/toolkit';

export type IPlayer = {
  locationX: number;
  locationY: number;
  xVector: number;
  yVector: number;
};

export interface SettingsState {
  player: IPlayer;
  canvas: HTMLCanvasElement | null;
}

export const initialState: SettingsState = {
  player: {
    locationX: 0,
    locationY: 0,
    xVector: 0,
    yVector: 0,
  },
  canvas: null,
};

export const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setPlayerLocationX: (state, action) => {
      state.player.locationX = action.payload;
    },
    setPlayerLocationY: (state, action) => {
      state.player.locationY = action.payload;
    },
  },
  extraReducers: () => {},
});

export const settingsActions = settingsSlice.actions;

export default settingsSlice.reducer;
