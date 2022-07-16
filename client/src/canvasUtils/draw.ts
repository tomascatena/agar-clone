const randomX = Math.floor(Math.random() * 500 + 10);
const randomY = Math.floor(Math.random() * 500 + 10);

export const draw = (context: CanvasRenderingContext2D) => {
  context.beginPath();

  context.arc(randomX, randomY, 10, 0, 2 * Math.PI);
  context.fillStyle = 'rgb(255, 0, 0)';
  context.fill();

  context.lineWidth = 3;
  context.strokeStyle = 'rgb(0, 255, 0)';
  context.stroke();

  requestAnimationFrame(() => draw(context));
};
