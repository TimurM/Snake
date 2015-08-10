

1. Initial State of the game:

gameState = {
  appleCoord: null,
  score: 0,
  canvas: null,
  canvasContext: null,
  framesPerSecond: 30,
  cw: 15, //cell width
  leftX: 0,
  topY: 0,
  snakeArray: [],
  dir: "right", //direction
  color: "blue"
}


2. Create the snake & the apple:
gameState = {
  appleCoord: {x:1, y:2}, (if the apple doesn't exist create one)
  score: 0,
  canvas: null,
  canvasContext: null,
  framesPerSecond: 30,
  cw: 15, //cell width
  leftX: 0,
  topY: 0,
  snakeArray: [ //if the snake doesn't exist create one
      {x:2, y:0},
      {x:1, y:0},
      {x:0, y:0}],
  dir: "right", //direction
  color: "blue"
}

4. update the coords based on movement
- check to see if a user has updated direction of the snake
- increment snakes x & y coordinates based on it's direction
  -if the snake eats an appple, add a square to the snakeArray
  -otherwise, remove the tail and add it to the front

5. Move the snake until any collisions
    -Check to see if the snake collided with the walls or itself
      -if it did reset the game
6. Render the Game, the Apple and the Snake
