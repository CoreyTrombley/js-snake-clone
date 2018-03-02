const SIZE = 500;
const GRID = SIZE / 50;

export const drawBoard = (ctx) => {
  ctx.fillStyle = '#eee';
  ctx.fillRect(0, 0, SIZE, SIZE);
}

export const drawScore = (ctx, score) => {
  ctx.font = "16px Arial";
  ctx.fillStyle = "#444";
  ctx.textAlign = 'center';
  ctx.fillText(`Score: ${score}`, 40, 20);
}

export const drawFood = (ctx, food) => {
  ctx.fillStyle = '#ff005e';
  ctx.fillRect(food.x, food.y, GRID, GRID);
}

export const drawLevel = (ctx, level) => {
  ctx.font = "16px arial";
  ctx.fillStyle = "#444";
  ctx.textAlign = 'center';
  ctx.fillText(`Level: ${level}`, 38, 40);
}

export const drawPause = (ctx) => {
  ctx.fillStyle = '#444';
  ctx.font = '40px arial';
  ctx.textAlign = 'center';
  ctx.fillText('Paused', SIZE / 2, SIZE / 2);
}

export const drawStart = (ctx) => {
  ctx.fillStyle = '#444';
  ctx.font = '40px arial';
  ctx.textAlign = 'center';
  ctx.fillText('Press enter to start', SIZE / 2, SIZE / 2);
}

export const drawEnd = (ctx) => {
  ctx.fillStyle = '#444';
  ctx.font = '40px arial';
  ctx.textAlign = 'center';
  ctx.fillText('Press enter to restart', SIZE / 2, SIZE / 2);
}
