import { GameSettings } from '@/gameSettings';
import { getRandomColor } from '@/utils/getRandomColor';

export class Orb {
  color: string;
  locationX: number;
  locationY: number;
  radius: number;

  constructor(settings: GameSettings) {
    this.color = getRandomColor();
    this.locationX = Math.floor(Math.random() * settings.worldWidth);
    this.locationY = Math.floor(Math.random() * settings.worldHeight);
    this.radius = 5;
  }
}
