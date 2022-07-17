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

export type LeaderBoardItem = {
  name: string;
  score: number;
};

export type ILeaderBoard = LeaderBoardItem[];
