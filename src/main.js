import * as renders from './renders';

// animation fps setup
let startTime;
let fps = 10;
let now;
let then = Date.now();
let interval = 1000 / fps;
let delta;

// Score Level Setup
let score = 0;
let level = 1;

// board set up
const SIZE = 500;
const GRID = SIZE / 50;

const eatFood = new Audio('./eat.mp3'); // buffers automatically when created

const board = document.getElementById('board');
board.height = board.width = SIZE * 2;
board.style.width = board.style.height = SIZE + 'px';

const ctx = board.getContext('2d');
ctx.scale(2, 2);

// setup snake
let newDirection = 1
let direction = 1;
let snakeLength = 5;
let snake = [{x: SIZE / 2, y: SIZE / 2}];
let food = null;
let end = false;
let paused = false;
let started = false;

// helper functions
const randomOffset = () => {
  return Math.floor(Math.random() * SIZE / GRID) * GRID;
}

const stringCoords = (obj) => {
  return `${obj.x},${obj.y}`;
}

// checks
const did_eat_food = (food, snake) => {
  if (food && food.x === snake.x && food.y === snake.y) {
    eatFood.play();
    food = null;
    score += 1;
    snakeLength += 5;

    if (score % 2 === 0) {
      level += 3;
      fps = fps < 60 ? 10 + level : 60;
      interval = 1000 / fps;
    }
  }
}

window.onkeydown = (e) => {
  // pause
  if (e.keyCode === 80) {
    if (paused === true) {
      paused = false;
      window.requestAnimationFrame(draw);
      return;
    } else {
      paused = true;
      renders.drawPause(ctx);
      return;
    }
  }

  // reset
  if (e.keyCode === 13 && end === true) {
    e.preventDefault();
    document.location.reload(true);
    return;
  }

  if (e.keyCode === 13 && started !== true) {
    started = true;
    window.requestAnimationFrame(draw);
    return;
  }

  // movement
  newDirection = {37: -1, 38: -2, 39: 1, 40: 2}[e.keyCode] || newDirection;
};

const draw = (timestamp) => {

  timestamp = timestamp || new Date().getTime();

  // check if the game is paused
  if (paused === true) {
    renders.drawPause(ctx);
    return;
  }

  // check if the game has started
  if (started !== true) {
    renders.drawBoard(ctx);
    renders.drawStart(ctx);
    return;
  }

  // check if the game has ended
  if (end === true) {
    renders.drawEnd(ctx);
    return;
  }

  window.requestAnimationFrame(timestamp => draw(timestamp))

  now = Date.now();
  delta = now - then;

  // manage fps / difficulty
  if (delta > interval) {
    then = now - (delta % interval);

    const currentHead = {x: snake[0].x, y: snake[0].y};

    if (Math.abs(direction) !== Math.abs(newDirection)) {
      direction = newDirection;
    }

    const axis = Math.abs(direction) === 1 ? 'x' : 'y';
    if (direction < 0) {
      currentHead[axis] -= GRID;
    } else {
      currentHead[axis] += GRID;
    }

    did_eat_food(food, currentHead);

    renders.drawBoard(ctx);
    renders.drawScore(ctx, score);
    renders.drawLevel(ctx, level);

    if (end) {
      renders.drawEnd(ctx);
    } else {
      snake.unshift(currentHead);
      snake = snake.slice(0, snakeLength);
    }

    // Collisions === end game
    if (currentHead.x < 0 || currentHead.x >= SIZE || currentHead.y < 0 || currentHead.y >= SIZE) {
       end = true;
    }

    ctx.fillStyle = '#2db0ed';
    const snakeObj = {};
    for (let i = 0; i < snake.length; i++) {
      let a = snake[i];
      ctx.fillRect(a.x, a.y, GRID, GRID);
      if (i > 0) {
         snakeObj[stringCoords(a)] = true;
      }
    }

    if (snakeObj[stringCoords(currentHead)]) {
       end = true;
    }

    // make sure we always have food to eat
    while (!food || snakeObj[stringCoords(food)]) {
      food = {x: randomOffset(), y: randomOffset()};
    }

    renders.drawFood(ctx, food);
  }
}

window.onload = () => {
  window.requestAnimationFrame(timestamp => {
    startTime = timestamp || new Date().getTime();
    draw(startTime);
  })
};
