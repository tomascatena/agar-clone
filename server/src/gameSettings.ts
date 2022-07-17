export type GameSettings = {
  defaultOrbs: number;
  defaultSpeed: number;
  defaultRadius: number;
  defaultZoom: number;
  worldWidth: number;
  worldHeight: number;
};

export const gameSettings: GameSettings = {
  defaultOrbs: 2000,
  defaultSpeed: 6,
  defaultRadius: 6,
  defaultZoom: 1.5, // As the player gets bigger, the zoom need to go out.
  worldWidth: 4000,
  worldHeight: 4000,
} as const;
