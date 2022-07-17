import { ILeaderBoard, IOrb, IPlayer, IPlayerFromServer } from '@/typings/typings';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

type IUpdateOrb = {
  newOrb: IOrb;
  orbIndex: number;
};

export interface SettingsState {
  hasJoinedGame: boolean;
  player: IPlayer;
  canvas: HTMLCanvasElement | null;
  orbs: IOrb[];
  players: IPlayerFromServer[];
  leaderBoard: ILeaderBoard;
}

export const initialState: SettingsState = {
  hasJoinedGame: false,
  player: {
    name: '',
    locationX: 0,
    locationY: 0,
    xVector: 0,
    yVector: 0,
  },
  canvas: null,
  orbs: [],
  players: [],
  leaderBoard: [],
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
    setPlayers: (state, action) => {
      state.players = action.payload;
    },
    setPlayerXVector: (state, action) => {
      state.player.xVector = action.payload;
    },
    setPlayerYVector: (state, action) => {
      state.player.yVector = action.payload;
    },
    updateOrbs: (state, action: PayloadAction<IUpdateOrb>) => {
      state.orbs = [
        ...state.orbs.slice(0, action.payload.orbIndex),
        action.payload.newOrb,
        ...state.orbs.slice(action.payload.orbIndex + 1),
      ];
    },
    setLeaderBoard: (state, action) => {
      state.leaderBoard = action.payload;
    },
    setHasJoinedGame: (state, action) => {
      state.hasJoinedGame = action.payload;
    },
  },
  extraReducers: () => {},
});

export const settingsActions = settingsSlice.actions;

export default settingsSlice.reducer;
