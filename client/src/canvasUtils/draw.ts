import { store } from '@/store/store';

export const draw = (context: CanvasRenderingContext2D) => {
  const { player } = store.getState().settings;

  // Reset the current transformation to the identity matrix.
  context.setTransform(1, 0, 0, 1, 0, 0);

  // Wipe the canvas out and start over.
  context.clearRect(0, 0, context.canvas.width, context.canvas.height);

  // Clamp camera to the player.
  const cameraX = -player.locationX + context.canvas.width / 2;
  const cameraY = -player.locationY + context.canvas.height / 2;
  context.translate(cameraX, cameraY);

  context.beginPath();

  context.arc(player.locationX, player.locationY, 10, 0, 2 * Math.PI);
  context.fillStyle = 'rgb(255, 0, 0)';
  context.fill();

  context.lineWidth = 3;
  context.strokeStyle = 'rgb(0, 255, 0)';
  context.stroke();

  requestAnimationFrame(() => draw(context));
};
