import { createSlice } from '@reduxjs/toolkit';

export type IPlayer = {
  name: string;
  locationX: number;
  locationY: number;
  xVector: number;
  yVector: number;
};

export type IOrb = {
  color: string;
  locationX: number;
  locationY: number;
  radius: number;
};

export interface SettingsState {
  player: IPlayer;
  canvas: HTMLCanvasElement | null;
  orbs: IOrb[];
}

export const initialState: SettingsState = {
  player: {
    name: '',
    locationX: 0,
    locationY: 0,
    xVector: 0,
    yVector: 0,
  },
  canvas: null,
  orbs: [],
};

export const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setPlayerName: (state, action) => {
      state.player.name = action.payload;
    },
    setPlayerLocationX: (state, action) => {
      state.player.locationX = action.payload;
    },
    setPlayerLocationY: (state, action) => {
      state.player.locationY = action.payload;
    },
    setOrbs: (state, action) => {
      state.orbs = action.payload;
    },
  },
  extraReducers: () => {},
});

export const settingsActions = settingsSlice.actions;

export default settingsSlice.reducer;
