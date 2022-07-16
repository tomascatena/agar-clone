import { GameSettings } from '@/gameSettings';
import { getRandomColor } from '@/utils/getRandomColor';

export class PlayerData {
  name: string;
  locationX: number;
  locationY: number;
  radius: number;
  color: string;
  score: number;

  constructor(playerName: string, settings: GameSettings) {
    this.name = playerName;
    this.locationX = Math.floor(Math.random() * settings.worldWidth + 100);
    this.locationY = Math.floor(Math.random() * settings.worldHeight + 100);
    this.radius = settings.defaultRadius;
    this.color = getRandomColor();
    this.score = 0;
  }
}
