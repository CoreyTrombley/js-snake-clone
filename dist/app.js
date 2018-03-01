/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__renders__ = __webpack_require__(1);


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
let newDirection = 1;
let direction = 1;
let snakeLength = 5;
let snake = [{ x: SIZE / 2, y: SIZE / 2 }];
let food = null;
let end = false;
let paused = false;
let started = false;

// helper functions
const randomOffset = () => {
  return Math.floor(Math.random() * SIZE / GRID) * GRID;
};

const stringCoords = obj => {
  return `${obj.x},${obj.y}`;
};

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
};

window.onkeydown = e => {
  // pause
  if (e.keyCode === 80) {
    if (paused === true) {
      paused = false;
      window.requestAnimationFrame(draw);
      return;
    } else {
      paused = true;
      __WEBPACK_IMPORTED_MODULE_0__renders__["e" /* drawPause */](ctx);
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
  newDirection = { 37: -1, 38: -2, 39: 1, 40: 2 }[e.keyCode] || newDirection;
};

const draw = timestamp => {

  timestamp = timestamp || new Date().getTime();

  if (paused === true) {
    __WEBPACK_IMPORTED_MODULE_0__renders__["e" /* drawPause */](ctx);
    return;
  }

  if (started !== true) {
    __WEBPACK_IMPORTED_MODULE_0__renders__["a" /* drawBoard */](ctx);
    __WEBPACK_IMPORTED_MODULE_0__renders__["g" /* drawStart */](ctx);
    return;
  }

  if (end === true) {
    __WEBPACK_IMPORTED_MODULE_0__renders__["b" /* drawEnd */](ctx);
    return;
  }

  window.requestAnimationFrame(timestamp => draw(timestamp));

  now = Date.now();
  delta = now - then;

  if (delta > interval) {
    then = now - delta % interval;

    const newHead = { x: snake[0].x, y: snake[0].y };

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

    __WEBPACK_IMPORTED_MODULE_0__renders__["a" /* drawBoard */](ctx);
    __WEBPACK_IMPORTED_MODULE_0__renders__["f" /* drawScore */](ctx, score);
    __WEBPACK_IMPORTED_MODULE_0__renders__["d" /* drawLevel */](ctx, level);

    if (end) {
      __WEBPACK_IMPORTED_MODULE_0__renders__["b" /* drawEnd */](ctx);
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
      food = { x: randomOffset(), y: randomOffset() };
    }

    __WEBPACK_IMPORTED_MODULE_0__renders__["c" /* drawFood */](ctx, food);
  }
};

window.onload = () => {
  window.requestAnimationFrame(timestamp => {
    startTime = timestamp || new Date().getTime();
    draw(startTime);
  });
};

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const SIZE = 500;
const GRID = SIZE / 50;

const drawBoard = ctx => {
  ctx.fillStyle = '#eee';
  ctx.fillRect(0, 0, SIZE, SIZE);
};
/* harmony export (immutable) */ __webpack_exports__["a"] = drawBoard;


const drawScore = (ctx, score) => {
  ctx.font = "16px Arial";
  ctx.fillStyle = "#444";
  ctx.textAlign = 'center';
  ctx.fillText(`Score: ${score}`, 40, 20);
};
/* harmony export (immutable) */ __webpack_exports__["f"] = drawScore;


const drawFood = (ctx, food) => {
  ctx.fillStyle = '#e80055';
  ctx.fillRect(food.x, food.y, GRID, GRID);
};
/* harmony export (immutable) */ __webpack_exports__["c"] = drawFood;


const drawLevel = (ctx, level) => {
  ctx.font = "16px arial";
  ctx.fillStyle = "#444";
  ctx.textAlign = 'center';
  ctx.fillText(`Level: ${level}`, 38, 40);
};
/* harmony export (immutable) */ __webpack_exports__["d"] = drawLevel;


const drawPause = ctx => {
  ctx.fillStyle = '#444';
  ctx.font = '40px arial';
  ctx.textAlign = 'center';
  ctx.fillText('Paused', SIZE / 2, SIZE / 2);
};
/* harmony export (immutable) */ __webpack_exports__["e"] = drawPause;


const drawStart = ctx => {
  ctx.fillStyle = '#444';
  ctx.font = '40px arial';
  ctx.textAlign = 'center';
  ctx.fillText('Press enter to start', SIZE / 2, SIZE / 2);
};
/* harmony export (immutable) */ __webpack_exports__["g"] = drawStart;


const drawEnd = ctx => {
  ctx.fillStyle = '#444';
  ctx.font = '40px arial';
  ctx.textAlign = 'center';
  ctx.fillText('Press enter to restart', SIZE / 2, SIZE / 2);
};
/* harmony export (immutable) */ __webpack_exports__["b"] = drawEnd;


/***/ })
/******/ ]);
//# sourceMappingURL=app.js.map