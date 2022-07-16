import { PlayerConfig } from './PlayerConfig';
import { PlayerData } from './PlayerData';

export class Player {
  socketId: string;
  playerConfig: PlayerConfig;
  playerData: PlayerData;

  constructor(socketId: string, playerConfig: PlayerConfig, playerData: PlayerData) {
    this.socketId = socketId;
    this.playerConfig = playerConfig;
    this.playerData = playerData;
  }
}
