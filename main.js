// entry point

if (typeof window !== 'undefined') window.onload = function() {
  // once the page loads the following code will run
  var canvasElement = document.getElementById('gameCanvas')
  var prevMax = 0;
  var gameState = createGameState(canvasElement, prevMax)

  setInterval(function() {
    //updates the gameState
    gameState = updateGameState(gameState);

    prevMax = (gameState.score > gameState.prevMaxScore ? gameState.score : gameState.prevMaxScore);
    // Checks if the snake exceeds the boundries of the board and if so, the game resets by creating a new gameState
    if (checkBoundryCollision(gameState)) gameState = createGameState(canvasElement, prevMax);

    // renders the gameState, no return value
    renderFrame(gameState, canvasElement);
  }, 1000/gameState.framesPerSecond);

  //listens for keydown event to see if direction has changed
  document.addEventListener('keydown', function(evt) {
    gameState = updateSnakeDirection(gameState, keyCodeToDirName(evt.which))
  }, false);

  //listens for click event to see if the reset button was clicked
  document.addEventListener('mousedown', function(evt) {
    gameState = createGameState(canvasElement, prevMax);
  }, false)
}

var updateGameState = compose([
  moveEverything,
  createApple,
  checkCollisionWithSelf
].reverse())

var renderFrame = compose([
  drawBoard,
  drawApple,
  drawSnake,
  drawScore,
  drawGameOverScreen
].reverse())

function keyCodeToDirName(code) {
  return {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down',
  }[code]
}
// ---
// core game logic

var createGameState = function(canvasElement, prevMax) {
  var gameState = {};
  // game config
  gameState.apple = {x: 10, y:10, timeCreated: new Date(), expireInSec: 10}; //default placement of the apple
  gameState.score = 0;
  gameState.prevMaxScore = prevMax || 0;
  gameState.colorChanged = false;
  gameState.scoreColor = "blue"; //default

  // canvas config
  gameState.canvas = canvasElement;
  gameState.boardWidth  = canvasElement.width;
  gameState.boardHeight = canvasElement.height;
  gameState.canvasContext = canvasElement.getContext('2d');
  gameState.cw = 16 //cell width
  gameState.showGameOverScreen = false;
  gameState.framesPerSecond = 10;

  // snake properties
  gameState.snakeArray = createDefaultSnake();
  gameState.dir = "right"; //direction
  gameState.color = "blue";

  return gameState;
}

function moveEverything(gameState) {
  if(gameState.showGameOverScreen) {
    return gameState;
  }
  var dir = gameState.dir;
  var apple = gameState.apple;
  var snakeArray = gameState.snakeArray;
  var nx = snakeArray[0].x;
  var ny = snakeArray[0].y;

  //These were the position of the head cell.
  //We will increment it to get the new head position
  //Lets add proper direction based movement now
  if(dir == "right") nx++;
  else if(dir == "left") nx--;
  else if(dir == "up") ny--;
  else if(dir == "down") ny++;
  var tail;

  //if snake eats an apple, reset apple Coords
  if(apple.x === nx && apple.y === ny) {
    tail = {
      x: nx,
      y: ny
    }
    gameState.apple = null;
    gameState.score += 1;
  } else {
    tail = snakeArray.pop()
    tail.x = nx;
    tail.y = ny;
  }

  snakeArray.unshift(tail); //if snake eats an apple, snakeArray increase by 1
  gameState.snakeArray = snakeArray;
  return gameState;
};

var checkBoundryCollision = function(gameState) {

  var snakeArray = gameState.snakeArray;
  //if snake is not instantiated then there are no collisions
  if(snakeArray.length === 0) return false;

  var snakeHead = snakeArray[0];
  var width = gameState.boardWidth;
  var height = gameState.boardHeight;

  //checks if the snake hits any of the walls
  if(snakeHead.x === -1 || snakeHead.x >= width/gameState.cw ||
      snakeHead.y === -1 || snakeHead.y >= height/gameState.cw) {
        return true;
      }
  return false;
};
function checkCollisionWithSelf(gameState) {
  var snakeArray = gameState.snakeArray;
  //if snake is not instantiated then there are no collisions
  if(snakeArray.length === 0) return false;

  var snakeHead = snakeArray[0];
  var remainingSnakeArray = snakeArray.slice(1);

  // checks if the snake collides with itself
  for(var i = 0; i < remainingSnakeArray.length; i++) {
    if(remainingSnakeArray[i].x === snakeHead.x &&
      remainingSnakeArray[i].y === snakeHead.y) {
      // A switch for game over
      gameState.showGameOverScreen = true;
    }
  }
  return gameState;
};

function updateSnakeDirection(gameState, newDir) {
  if(newDir == "left"  && gameState.dir != "right") gameState.dir = "left";
  if(newDir == "up"    && gameState.dir != "down")  gameState.dir = "up";
  if(newDir == "right" && gameState.dir != "left")  gameState.dir = "right";
  if(newDir == "down"  && gameState.dir != "up")    gameState.dir = "down";
  return gameState
}

var createDefaultSnake = function() {
  var length = 3; //default length of the snake
  var snakeArray = []
  for(var i = length-1; i>=0; i--) {
    snakeArray.push({x: i, y:0});
  }
  return snakeArray;
};

function createApple(gameState) {
  var width = gameState.boardWidth;
  var height = gameState.boardHeight;
  var cellWidth = gameState.cw;

  if(!gameState.apple) {
    gameState.apple = newApple(width, height, cellWidth);
    return gameState;
  }
  var apple = gameState.apple;
  var createdTime = apple.timeCreated;
  var currentTime = new Date();

  // checks if the apple timer has expired
  if(Math.abs((currentTime.getSeconds() - createdTime.getSeconds())) > apple.expireInSec) {
    gameState.apple = newApple(width, height, cellWidth);
  }
  return gameState;
};

function newApple(width, height, cellWidth) {

  return {
    x: Math.round(Math.random()*(width-cellWidth)/cellWidth),
    y: Math.round(Math.random()*(height-cellWidth)/cellWidth),
    timeCreated: new Date(),
    expireInSec: Math.floor((Math.random() * 10) + 1)
  }
}
// ---

// canvas ui rendering logic

// input: <Map>
// output: <Map>
function drawBoard(gameState) {
    var width = gameState.boardWidth;
    var height = gameState.boardHeight;

    colorRect(gameState, 0, 0, width, height, 'yellow');
    strokeRect(gameState, 0, 0, width, height, 'black');
    return gameState;
};

function drawGameOverScreen(gameState) {
  // if game is over, display the gameover screen
  if(gameState.showGameOverScreen) {
    var width = gameState.boardWidth;
    var height = gameState.boardHeight;

    colorRect(gameState, width/2-100, height/2-25, 200, 50, 'green');
    gameState.canvasContext.fillStyle = 'white';
    gameState.canvasContext.font = "20px Arial";;
    gameState.canvasContext.fillText("Play Again", width/2-50, height/2+5)
  }
  return gameState;
}

function drawSnake(gameState) {
  var squareSide = gameState.cw; //provides width and height of a square
  var snakeArray = gameState.snakeArray;

  for(var i = 0; i < snakeArray.length; i++) {
    var square = snakeArray[i];
    var squareX = square.x*squareSide;
    var squareY = square.y*squareSide;
    colorRect(gameState, squareX, squareY, squareSide, squareSide, "blue");
    strokeRect(gameState, squareX, squareY, squareSide, squareSide, 'black')
  }
  return gameState;
};

function drawApple(gameState) {
  var appleSide = gameState.cw;
  var apple = gameState.apple;
  var appleX = apple.x*appleSide;
  var appleY = apple.y*appleSide;

  colorRect(gameState, appleX, appleY, appleSide, appleSide, "red");
  return gameState;
};

function drawScore(gameState) {
  if(gameState.score > gameState.prevMaxScore && !gameState.colorChanged) {
    gameState.colorChanged = true;
    gameState.scoreColor = randomColor();
  }
  var gameScoreWithLabel = "score: " + gameState.score;
  var gameMaxScoreWithLabel = "Max score: " + gameState.prevMaxScore;

  gameState.canvasContext.font = "20px Arial";
  gameState.canvasContext.fillStyle = gameState.scoreColor;
  gameState.canvasContext.fillText(gameMaxScoreWithLabel, gameState.boardWidth-143, 20)
  gameState.canvasContext.fillText(gameScoreWithLabel, gameState.boardWidth-100, 50)
  return gameState;
};

// http://stackoverflow.com/questions/22237497/draw-a-circle-filled-with-random-color-sqares-on-canvas
function randomColor() {
  var r = 255*Math.random()|0,
        g = 255*Math.random()|0,
        b = 255*Math.random()|0;
    return 'rgb(' + r + ',' + g + ',' + b + ')';
}

function colorRect(gameState, leftX, topY, width, height, drawColor) {
  //colors a rectangle with drawColor
  gameState.canvasContext.fillStyle = drawColor;
  gameState.canvasContext.fillRect(leftX, topY, width, height);
};

function strokeRect(gameState, leftX, topY, width, height, borderColor) {
  // creates the border with the borderColor
  gameState.canvasContext.strokeStyle = borderColor;
  gameState.canvasContext.strokeRect(leftX, topY, width, height);
};

// ---

// generic js helpers

// Returns a function that is the composition of a list of functions,
// each consuming the return value of the function that follows.
// http://underscorejs.org/docs/underscore.html#section-86
function compose(fnList) {
  var start = fnList.length - 1;
  return function() {
    var i = start;
    var result = fnList[start].apply(this, arguments);
    while (i--) result = fnList[i].call(this, result);
    return result;
  };
};
