eval(require('fs').readFileSync('./main.js', 'utf8'))
// all the fns from main.js are loaded here


// Testing Check Collision With Self
var testCollisionWithSelf = function(testData) {
  var input = testData.input
  var expected = testData.expected

  var actual = checkCollisionWithSelf(input)
  var match = JSON.stringify(expected) === JSON.stringify(actual)
  if (!match) {
    console.log('expected',expected)
    console.log('actual',actual)
    process.exit(1)
  }
}

;[
 {
   input: {
     snakeArray: [
       {
         x: 33,
         y: 36,
       },
       {
         x: 32,
         y: 36,
       },
       {
         x: 32,
         y: 37,
       },
       {
         x: 33,
         y: 37,
       },
       {
         x: 33,
         y: 37,
       },
       {
         x: 33,
         y: 36,
       }
     ],
     showGameOverScreen: false
   },
   expected: {
     snakeArray: [
       {
         x: 33,
         y: 36,
       },
       {
         x: 32,
         y: 36,
       },
       {
         x: 32,
         y: 37,
       },
       {
         x: 33,
         y: 37,
       },
       {
         x: 33,
         y: 37,
       },
       {
         x: 33,
         y: 36,
       }
     ],
     showGameOverScreen: true
   }
 },
 {
   input: {
     snakeArray: [
       {
         x: 33,
         y: 36,
       },
       {
         x: 32,
         y: 36,
       },
       {
         x: 32,
         y: 37,
       },
       {
         x: 33,
         y: 37,
       },
       {
         x: 33,
         y: 37,
       }
     ],
     showGameOverScreen: false
   },
   expected: {
     snakeArray: [
       {
         x: 33,
         y: 36,
       },
       {
         x: 32,
         y: 36,
       },
       {
         x: 32,
         y: 37,
       },
       {
         x: 33,
         y: 37,
       },
       {
         x: 33,
         y: 37,
       }
     ],
     showGameOverScreen: false
   }
 }
].forEach(testCollisionWithSelf)
console.log("All of checkCollisionWithSelf tests pass")

var testCheckBoundryCollision = function(testData) {
  var input = testData.input
  var expected = testData.expected

  var actual = checkBoundryCollision(input)
  var match = JSON.stringify(expected) === JSON.stringify(actual)
  if (!match) {
    console.log('expected',expected)
    console.log('actual',actual)
    process.exit(1)
  }
}

;[
 { //collides with the top boundry
   input: {
     snakeArray: [
       {
         x: 16,
         y: -1,
       },
       {
         x: 16,
         y: 0,
       },
       {
         x: 16,
         y: 1,
       }
     ],
     boardWidth: 800,
     boardHeight: 800,
     cw: 16,
   },
   expected: true
 },
 { //collides with the right boundry
   input: {
     snakeArray: [
       {
         x: 50,
         y: 6,
       },
       {
         x: 49,
         y: 6,
       },
       {
         x: 48,
         y: 6,
       }
     ],
     boardWidth: 800,
     boardHeight: 800,
     cw: 16,
   },
   expected: true
 },
 { //collides with the bottom boundry
   input: {
     snakeArray: [
       {
         x: 31,
         y: 50,
       },
       {
         x: 31,
         y: 49,
       },
       {
         x: 31,
         y: 48,
       }
     ],
     boardWidth: 800,
     boardHeight: 800,
     cw: 16,
   },
   expected: true
 },
 { //collides with the bottom boundry
   input: {
     snakeArray: [
       {
         x: -1,
         y: 3,
       },
       {
         x: 0,
         y: 3,
       },
       {
         x: 1,
         y: 3,
       }
     ],
     boardWidth: 800,
     boardHeight: 800,
     cw: 16,
   },
   expected: true
 },
 { //does not collide with anything
   input: {
     snakeArray: [
       {
         x: 1,
         y: 3,
       },
       {
         x: 2,
         y: 3,
       },
       {
         x: 3,
         y: 3,
       }
     ],
     boardWidth: 800,
     boardHeight: 800,
     cw: 16,
   },
   expected: false
 }
].forEach(testCheckBoundryCollision)
console.log("All of checkBoundryCollision tests pass")

var testMoveEverything = function(testData) {
  var input = testData.input
  var expected = testData.expected

  var actual = moveEverything(input)
  var match = JSON.stringify(expected) === JSON.stringify(actual)
  if (!match) {
    console.log('expected',expected)
    console.log('actual',actual)
    process.exit(1)
  }
}

;[
 { //move right
   input: {
     dir: "right",
     snakeArray: [
       {
         x: 13,
         y: 0,
       },
       {
         x: 12,
         y: 0,
       },
       {
         x: 11,
         y: 0,
       }
     ],
    apple: {
      x: 10,
      y: 10,
      timeCreated: "Sun Aug 09 2015 18:57:39 GMT-0700 (PDT)",
      expireInSec: 10
    },
    score: 0
   },
   expected: {
     dir: "right",
     snakeArray: [
       {
         x: 14,
         y: 0,
       },
       {
         x: 13,
         y: 0,
       },
       {
         x: 12,
         y: 0,
       }
     ],
    apple: {
      x: 10,
      y: 10,
      timeCreated: "Sun Aug 09 2015 18:57:39 GMT-0700 (PDT)",
      expireInSec: 10
    },
    score: 0
   }
  },
   { //move left
     input: {
       dir: "left",
       snakeArray: [
         {
           x: 6,
           y: 0,
         },
         {
           x: 7,
           y: 0,
         },
         {
           x: 8,
           y: 0,
         }
       ],
      apple: {
        x: 10,
        y: 10,
        timeCreated: "Sun Aug 09 2015 18:57:39 GMT-0700 (PDT)",
        expireInSec: 10
      },
      score: 0
     },
     expected: {
       dir: "left",
       snakeArray: [
         {
           x: 5,
           y: 0,
         },
         {
           x: 6,
           y: 0,
         },
         {
           x: 7,
           y: 0,
         }
       ],
      apple: {
        x: 10,
        y: 10,
        timeCreated: "Sun Aug 09 2015 18:57:39 GMT-0700 (PDT)",
        expireInSec: 10
      },
      score: 0
     },
   },
   { //eat apple
     input: {
       dir: "down",
       snakeArray: [
         {
           x: 10,
           y: 9,
         },
         {
           x: 10,
           y: 8,
         },
         {
           x: 10,
           y: 7,
         }
       ],
      apple: {
        x: 10,
        y: 10,
        timeCreated: "Sun Aug 09 2015 18:57:39 GMT-0700 (PDT)",
        expireInSec: 10
      },
      score: 0
     },
     expected: {
       dir: "down",
       snakeArray: [
         {
           x: 10,
           y: 10,
         },
         {
           x: 10,
           y: 9,
         },
         {
           x: 10,
           y: 8,
         },
         {
           x: 10,
           y: 7,
         }
       ],
      apple: null,
      score: 1
     },
   }
].forEach(testMoveEverything)
console.log("All of moveEverything tests pass")

var testUpdateSnakeDirection = function(testData) {
  var input = testData.input;
  var gameState = input[0];
  var newDir = input[1];
  var expected = testData.expected;

  var actual = updateSnakeDirection(gameState, newDir)
  var match = JSON.stringify(expected) === JSON.stringify(actual)
  if (!match) {
    console.log('expected',expected)
    console.log('actual',actual)
    process.exit(1)
  }
}

;[
 { //moving up and turning left
   input: [
     {
       dir: "up"
     },
     "left"
   ],
   expected: {
     dir: "left",
   }
  },
 { //moving down and turning left
   input: [
     {
       dir: "down"
     },
     "left"
   ],
   expected: {
     dir: "left",
   }
  },
 { //moving down and turning right
   input: [
     {
       dir: "down"
     },
     "right"
   ],
   expected: {
     dir: "right",
   }
  },
 { //moving up and turning right
   input: [
     {
       dir: "up"
     },
     "right"
   ],
   expected: {
     dir: "right",
   }
  },
 { //moving right and turning down
   input: [
     {
       dir: "right"
     },
     "down"
   ],
   expected: {
     dir: "down",
   }
  },
 { //moving right and turning up
   input: [
     {
       dir: "right"
     },
     "up"
   ],
   expected: {
     dir: "up",
   }
  },
 { //moving right and does not reverse
   input: [
     {
       dir: "right"
     },
     "left"
   ],
   expected: {
     dir: "right",
   }
  },
 { //moving left and does not reverse
   input: [
     {
       dir: "left"
     },
     "right"
   ],
   expected: {
     dir: "left",
   }
  },
 { //moving up and does not reverse
   input: [
     {
       dir: "up"
     },
     "down"
   ],
   expected: {
     dir: "up",
   }
  },
 { //moving down and does not reverse
   input: [
     {
       dir: "down"
     },
     "up"
   ],
   expected: {
     dir: "down",
   }
  },
].forEach(testUpdateSnakeDirection)
console.log("All of updateSnakeDirection tests pass")
