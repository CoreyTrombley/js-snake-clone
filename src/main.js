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

const board = document.getElementById('board');
board.height = board.width = SIZE * 2;
board.style.width = board.style.height = SIZE + 'px';

const ctx = board.getContext('2d');
ctx.scale(2, 2);

// setup snake
let direction = newDirection = 1;
let snakeLength = 5;
let snake = [{x: SIZE / 2, y: SIZE / 2}];
let food = null;
let end = false;

// helper functions
const randomOffset = () => {
  return Math.floor(Math.random() * SIZE / GRID) * GRID;
}

const stringCoords = (obj) => {
  return `${obj.x},${obj.y}`;
}

const drawScore = () => {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#444";
    ctx.textAlign = 'center';
    ctx.fillText(`Score: ${score}`, 40, 20);
}

const drawLevel = () => {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#444";
    ctx.textAlign = 'center';
    ctx.fillText(`Level: ${level}`, 38, 40);
}


// checks
const did_eat_food = (food, snake) => {
  if (food && food.x === snake.x && food.y === snake.y) {
    food = null;
    score += 1;
    snakeLength += 5;

    if (score % 2 === 0) {
      level += 1;
      fps = fps < 60 ? 10 + level : 60;
      interval = 1000 / fps;
    }
  }
}

window.onkeydown = (e) => {
  if (e.keyCode === 13 && end === true) {
    console.log('pressed')
    e.preventDefault();
    document.location.reload(true);
    return;
  }
  newDirection = {37: -1, 38: -2, 39: 1, 40: 2}[e.keyCode] || newDirection;
};

const draw = (timestamp) => {

  timestamp = timestamp || new Date().getTime();


  if (end !== true) {
    window.requestAnimationFrame(timestamp => draw(timestamp))
  } else {
    ctx.fillStyle = '#444';
    ctx.font = '40px arial';
    ctx.textAlign = 'center';
    ctx.fillText('Press enter to restart', SIZE / 2, SIZE / 2);
  }

  now = Date.now();
  delta = now - then;

  drawScore();
  drawLevel();
  if (delta > interval) {
    then = now - (delta % interval);

    const newHead = {x: snake[0].x, y: snake[0].y};

    if (Math.abs(direction) !== Math.abs(newDirection)) {
      direction = newDirection;
    }

    const axis = Math.abs(direction) === 1 ? 'x' : 'y';
    if (direction < 0) {
      newHead[axis] -= GRID;
    } else {
      newHead[axis] += GRID;
    }

    did_eat_food(food, newHead);

    ctx.fillStyle = '#eee' // '#002b36';
    ctx.fillRect(0, 0, SIZE, SIZE);

    if (end) {
      ctx.fillStyle = '#444';
      ctx.font = '40px arial';
      ctx.textAlign = 'center';
      ctx.fillText('Press enter to start', SIZE / 2, SIZE / 2);
    } else {
      snake.unshift(newHead);
      snake = snake.slice(0, snakeLength);
    }

    // Collisions
    if (newHead.x < 0 || newHead.x >= SIZE || newHead.y < 0 || newHead.y >= SIZE) {
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

    if (snakeObj[stringCoords(newHead)]) {
       end = true;
    }

    while (!food || snakeObj[stringCoords(food)]) {
      food = {x: randomOffset(), y: randomOffset()};
    }
    ctx.fillStyle = '#e80055';
    ctx.fillRect(food.x, food.y, GRID, GRID);

  }
}


window.onload = () => {
  window.requestAnimationFrame(timestamp => {
    startTime = timestamp || new Date().getTime();
    draw(startTime);
  })
};
