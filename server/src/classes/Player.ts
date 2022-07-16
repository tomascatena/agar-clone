import { PlayerPrivateConfig } from './PlayerPrivateConfig';
import { PlayerPublicData } from './PlayerPublicData';

export class Player {
  socketId: string;
  playerConfig: PlayerPrivateConfig;
  playerData: PlayerPublicData;

  constructor(socketId: string, playerConfig: PlayerPrivateConfig, playerData: PlayerPublicData) {
    this.socketId = socketId;
    this.playerConfig = playerConfig;
    this.playerData = playerData;
  }
}
