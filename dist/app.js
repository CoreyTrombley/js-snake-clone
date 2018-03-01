(function(){function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s}return e})()({1:[function(require,module,exports){
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

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy5udm0vdmVyc2lvbnMvbm9kZS92OC45LjEvbGliL25vZGVfbW9kdWxlcy9idWlsZC10b29scy9ub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIiwic3JjL21haW4uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9cmV0dXJuIGV9KSgpIiwiLy8gYW5pbWF0aW9uIGZwcyBzZXR1cFxubGV0IHN0YXJ0VGltZTtcbmxldCBmcHMgPSAxMDtcbmxldCBub3c7XG5sZXQgdGhlbiA9IERhdGUubm93KCk7XG5sZXQgaW50ZXJ2YWwgPSAxMDAwIC8gZnBzO1xubGV0IGRlbHRhO1xuXG5cbi8vIFNjb3JlIExldmVsIFNldHVwXG5sZXQgc2NvcmUgPSAwO1xubGV0IGxldmVsID0gMTtcblxuLy8gYm9hcmQgc2V0IHVwXG5jb25zdCBTSVpFID0gNTAwO1xuY29uc3QgR1JJRCA9IFNJWkUgLyA1MDtcblxuY29uc3QgYm9hcmQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYm9hcmQnKTtcbmJvYXJkLmhlaWdodCA9IGJvYXJkLndpZHRoID0gU0laRSAqIDI7XG5ib2FyZC5zdHlsZS53aWR0aCA9IGJvYXJkLnN0eWxlLmhlaWdodCA9IFNJWkUgKyAncHgnO1xuXG5jb25zdCBjdHggPSBib2FyZC5nZXRDb250ZXh0KCcyZCcpO1xuY3R4LnNjYWxlKDIsIDIpO1xuXG4vLyBzZXR1cCBzbmFrZVxubGV0IGRpcmVjdGlvbiA9IG5ld0RpcmVjdGlvbiA9IDE7XG5sZXQgc25ha2VMZW5ndGggPSA1O1xubGV0IHNuYWtlID0gW3t4OiBTSVpFIC8gMiwgeTogU0laRSAvIDJ9XTtcbmxldCBmb29kID0gbnVsbDtcbmxldCBlbmQgPSBmYWxzZTtcblxuLy8gaGVscGVyIGZ1bmN0aW9uc1xuY29uc3QgcmFuZG9tT2Zmc2V0ID0gKCkgPT4ge1xuICByZXR1cm4gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogU0laRSAvIEdSSUQpICogR1JJRDtcbn1cblxuY29uc3Qgc3RyaW5nQ29vcmRzID0gKG9iaikgPT4ge1xuICByZXR1cm4gYCR7b2JqLnh9LCR7b2JqLnl9YDtcbn1cblxuY29uc3QgZHJhd1Njb3JlID0gKCkgPT4ge1xuICAgIGN0eC5mb250ID0gXCIxNnB4IEFyaWFsXCI7XG4gICAgY3R4LmZpbGxTdHlsZSA9IFwiIzQ0NFwiO1xuICAgIGN0eC50ZXh0QWxpZ24gPSAnY2VudGVyJztcbiAgICBjdHguZmlsbFRleHQoYFNjb3JlOiAke3Njb3JlfWAsIDQwLCAyMCk7XG59XG5cbmNvbnN0IGRyYXdMZXZlbCA9ICgpID0+IHtcbiAgICBjdHguZm9udCA9IFwiMTZweCBBcmlhbFwiO1xuICAgIGN0eC5maWxsU3R5bGUgPSBcIiM0NDRcIjtcbiAgICBjdHgudGV4dEFsaWduID0gJ2NlbnRlcic7XG4gICAgY3R4LmZpbGxUZXh0KGBMZXZlbDogJHtsZXZlbH1gLCAzOCwgNDApO1xufVxuXG5cbi8vIGNoZWNrc1xuY29uc3QgZGlkX2VhdF9mb29kID0gKGZvb2QsIHNuYWtlKSA9PiB7XG4gIGlmIChmb29kICYmIGZvb2QueCA9PT0gc25ha2UueCAmJiBmb29kLnkgPT09IHNuYWtlLnkpIHtcbiAgICBmb29kID0gbnVsbDtcbiAgICBzY29yZSArPSAxO1xuICAgIHNuYWtlTGVuZ3RoICs9IDU7XG5cbiAgICBpZiAoc2NvcmUgJSAyID09PSAwKSB7XG4gICAgICBsZXZlbCArPSAxO1xuICAgICAgZnBzID0gZnBzIDwgNjAgPyAxMCArIGxldmVsIDogNjA7XG4gICAgICBpbnRlcnZhbCA9IDEwMDAgLyBmcHM7XG4gICAgfVxuICB9XG59XG5cbndpbmRvdy5vbmtleWRvd24gPSAoZSkgPT4ge1xuICBpZiAoZS5rZXlDb2RlID09PSAxMyAmJiBlbmQgPT09IHRydWUpIHtcbiAgICBjb25zb2xlLmxvZygncHJlc3NlZCcpXG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGRvY3VtZW50LmxvY2F0aW9uLnJlbG9hZCh0cnVlKTtcbiAgICByZXR1cm47XG4gIH1cbiAgbmV3RGlyZWN0aW9uID0gezM3OiAtMSwgMzg6IC0yLCAzOTogMSwgNDA6IDJ9W2Uua2V5Q29kZV0gfHwgbmV3RGlyZWN0aW9uO1xufTtcblxuY29uc3QgZHJhdyA9ICh0aW1lc3RhbXApID0+IHtcblxuICB0aW1lc3RhbXAgPSB0aW1lc3RhbXAgfHwgbmV3IERhdGUoKS5nZXRUaW1lKCk7XG5cblxuICBpZiAoZW5kICE9PSB0cnVlKSB7XG4gICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSh0aW1lc3RhbXAgPT4gZHJhdyh0aW1lc3RhbXApKVxuICB9IGVsc2Uge1xuICAgIGN0eC5maWxsU3R5bGUgPSAnIzQ0NCc7XG4gICAgY3R4LmZvbnQgPSAnNDBweCBhcmlhbCc7XG4gICAgY3R4LnRleHRBbGlnbiA9ICdjZW50ZXInO1xuICAgIGN0eC5maWxsVGV4dCgnUHJlc3MgZW50ZXIgdG8gcmVzdGFydCcsIFNJWkUgLyAyLCBTSVpFIC8gMik7XG4gIH1cblxuICBub3cgPSBEYXRlLm5vdygpO1xuICBkZWx0YSA9IG5vdyAtIHRoZW47XG5cbiAgZHJhd1Njb3JlKCk7XG4gIGRyYXdMZXZlbCgpO1xuICBpZiAoZGVsdGEgPiBpbnRlcnZhbCkge1xuICAgIHRoZW4gPSBub3cgLSAoZGVsdGEgJSBpbnRlcnZhbCk7XG5cbiAgICBjb25zdCBuZXdIZWFkID0ge3g6IHNuYWtlWzBdLngsIHk6IHNuYWtlWzBdLnl9O1xuXG4gICAgaWYgKE1hdGguYWJzKGRpcmVjdGlvbikgIT09IE1hdGguYWJzKG5ld0RpcmVjdGlvbikpIHtcbiAgICAgIGRpcmVjdGlvbiA9IG5ld0RpcmVjdGlvbjtcbiAgICB9XG5cbiAgICBjb25zdCBheGlzID0gTWF0aC5hYnMoZGlyZWN0aW9uKSA9PT0gMSA/ICd4JyA6ICd5JztcbiAgICBpZiAoZGlyZWN0aW9uIDwgMCkge1xuICAgICAgbmV3SGVhZFtheGlzXSAtPSBHUklEO1xuICAgIH0gZWxzZSB7XG4gICAgICBuZXdIZWFkW2F4aXNdICs9IEdSSUQ7XG4gICAgfVxuXG4gICAgZGlkX2VhdF9mb29kKGZvb2QsIG5ld0hlYWQpO1xuXG4gICAgY3R4LmZpbGxTdHlsZSA9ICcjZWVlJyAvLyAnIzAwMmIzNic7XG4gICAgY3R4LmZpbGxSZWN0KDAsIDAsIFNJWkUsIFNJWkUpO1xuXG4gICAgaWYgKGVuZCkge1xuICAgICAgY3R4LmZpbGxTdHlsZSA9ICcjNDQ0JztcbiAgICAgIGN0eC5mb250ID0gJzQwcHggYXJpYWwnO1xuICAgICAgY3R4LnRleHRBbGlnbiA9ICdjZW50ZXInO1xuICAgICAgY3R4LmZpbGxUZXh0KCdQcmVzcyBlbnRlciB0byBzdGFydCcsIFNJWkUgLyAyLCBTSVpFIC8gMik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHNuYWtlLnVuc2hpZnQobmV3SGVhZCk7XG4gICAgICBzbmFrZSA9IHNuYWtlLnNsaWNlKDAsIHNuYWtlTGVuZ3RoKTtcbiAgICB9XG5cbiAgICAvLyBDb2xsaXNpb25zXG4gICAgaWYgKG5ld0hlYWQueCA8IDAgfHwgbmV3SGVhZC54ID49IFNJWkUgfHwgbmV3SGVhZC55IDwgMCB8fCBuZXdIZWFkLnkgPj0gU0laRSkge1xuICAgICAgIGVuZCA9IHRydWU7XG4gICAgfVxuXG4gICAgY3R4LmZpbGxTdHlsZSA9ICcjMmRiMGVkJztcbiAgICBjb25zdCBzbmFrZU9iaiA9IHt9O1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc25ha2UubGVuZ3RoOyBpKyspIHtcbiAgICAgIGxldCBhID0gc25ha2VbaV07XG4gICAgICBjdHguZmlsbFJlY3QoYS54LCBhLnksIEdSSUQsIEdSSUQpO1xuICAgICAgaWYgKGkgPiAwKSB7XG4gICAgICAgICBzbmFrZU9ialtzdHJpbmdDb29yZHMoYSldID0gdHJ1ZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoc25ha2VPYmpbc3RyaW5nQ29vcmRzKG5ld0hlYWQpXSkge1xuICAgICAgIGVuZCA9IHRydWU7XG4gICAgfVxuXG4gICAgd2hpbGUgKCFmb29kIHx8IHNuYWtlT2JqW3N0cmluZ0Nvb3Jkcyhmb29kKV0pIHtcbiAgICAgIGZvb2QgPSB7eDogcmFuZG9tT2Zmc2V0KCksIHk6IHJhbmRvbU9mZnNldCgpfTtcbiAgICB9XG4gICAgY3R4LmZpbGxTdHlsZSA9ICcjZTgwMDU1JztcbiAgICBjdHguZmlsbFJlY3QoZm9vZC54LCBmb29kLnksIEdSSUQsIEdSSUQpO1xuXG4gIH1cbn1cblxuXG53aW5kb3cub25sb2FkID0gKCkgPT4ge1xuICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKHRpbWVzdGFtcCA9PiB7XG4gICAgc3RhcnRUaW1lID0gdGltZXN0YW1wIHx8IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xuICAgIGRyYXcoc3RhcnRUaW1lKTtcbiAgfSlcbn07XG4iXX0=
