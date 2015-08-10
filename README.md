#Snake

This project is my implementation of the snake arcade classic [Live App.](http://timurmeyster.me/Snake)

###Features:
* Snake can be controlled by arrows
* Snake food will be placed randomly on screen
* Snake food has a random timeout between 4 to 10 seconds
* Snake elongates itself after eating food
* Every food intake gives 1 point
* Game is over when the snake gets in contact with itself
* Dimensions of food should be equal to dimension of one segment of the snake
* Dimensions of food should be 16px X 16px
* the game is 600px by 600px
* "Play Again" button should appear once the game is over
* In the subsequent gameplays, if the score is greater than the previous gameplay score, then change the color of the score

##Approach:

###Summary:
* The game is build using functional programming design patterns
* Build small functions that can be tested without any global dependencies
* 'gameState' record contains all of the configurations/state for the game
* Functions are broken up into two groups:
- "State-updating" functions:
```
gameState = updateGameState(gameState);
```
- "Rendering" functions:
```
renderFrame(gameState, canvasElement);
```
* window.onload initializes and updates the UI after all of the files are done loading


#### The gameState:

The gameState gets initialized to the following defaults
```
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

```

####State-updating functions:
Creates and updates position of the snake along with its size as the snake moves or eats food  
```
var updateGameState = compose([
  moveEverything,
  createApple,
  checkCollisionWithSelf
].reverse())
```

####Rendering functions:
Paints the game by rendering the gameState on each frame
```
var renderFrame = compose([
  drawBoard,
  drawApple,
  drawSnake,
  drawScore,
  drawGameOverScreen
].reverse())
```

### Test Coverage:
#####checkCollisionWithSelf() cases:
* When the snake collides with itself
* When the snake does not collide with itself

######checkBoundryCollision() cases:
* When the snake collides with the right boundary
* When the snake collides with the left boundary
* When the snake collides with the top boundary
* When the snake collides with the bottom boundary
* When the snake does not collide with any boundries

#####moveEverything() cases:
* When the snake moves right, it's position changes
* When the snake moves left, it's position changes
* When the snake moves top, it's position changes
* When the snake moves down, it's position changes
* When the snake eats an apple, it's position changes and it the size increases by 1

#####updateSnakeDirection() cases:
* When the snake is moving up and the user moves it left, it goes left
* When the snake is moving down and the user moves it left, it goes left
* When the snake is moving down and the user moves it right, it goes right
* When the snake is moving up and the user moves it right, it goes right
* When the snake is moving right and the user moves it down, it goes down
* When the snake is moving right and the user moves it up, it goes up
* When the snake is moving left and the user moves it down, it goes down
* When the snake is moving left and the user moves it up, it goes up
* When the snake is moving right, it does not reverse to go left
* When the snake is moving left, it does not reverse to go right
* When the snake is moving down, it does not reverse to go up
* When the snake is moving up, it does not reverse to go down
