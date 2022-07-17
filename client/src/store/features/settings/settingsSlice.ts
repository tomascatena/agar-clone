import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export type IPlayer = {
  name: string;
  locationX: number;
  locationY: number;
  xVector: number;
  yVector: number;
};

export type IPlayerConfig = {
  speed: number;
  zoom: number;
  xVector: number;
  yVector: number;
};

export type IPlayerData = {
  name: string;
  locationX: number;
  locationY: number;
  radius: number;
  color: string;
  score: number;
};

export type IPlayerFromServer = {
  socketId: string;
  playerConfig: IPlayerConfig;
  playerData: IPlayerData;
};

export type IOrb = {
  color: string;
  locationX: number;
  locationY: number;
  radius: number;
};

type LeaderBoardItem = {
  name: string;
  score: number;
};

export type ILeaderBoard = LeaderBoardItem[];

type IUpdateOrb = {
  newOrb: IOrb;
  orbIndex: number;
};

export interface SettingsState {
  playerName: string;
  player: IPlayer;
  canvas: HTMLCanvasElement | null;
  orbs: IOrb[];
  players: IPlayerFromServer[];
  leaderBoard: ILeaderBoard;
}

export const initialState: SettingsState = {
  playerName: '',
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
      state.playerName = action.payload;
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
  },
  extraReducers: () => {},
});

export const settingsActions = settingsSlice.actions;

export default settingsSlice.reducer;
