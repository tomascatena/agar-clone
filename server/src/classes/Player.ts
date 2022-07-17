import { PlayerConfig } from './PlayerConfig';
import { PlayerData } from './PlayerData';
import { v4 as uuidv4 } from 'uuid';

export class Player {
  socketId: string;
  playerConfig: PlayerConfig;
  playerData: PlayerData;
  playerId: string;

  constructor(socketId: string, playerConfig: PlayerConfig, playerData: PlayerData) {
    this.socketId = socketId;
    this.playerConfig = playerConfig;
    this.playerData = playerData;
    this.playerId = uuidv4();
  }
}
