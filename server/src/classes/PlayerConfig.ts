import { GameSettings } from '@/gameSettings';

export class PlayerConfig {
  xVector: number;
  yVector: number;
  speed: number;
  zoom: number;

  constructor(settings: GameSettings) {
    this.xVector = 0;
    this.yVector = 0;
    this.speed = settings.defaultSpeed;
    this.zoom = settings.defaultZoom;
  }
}
