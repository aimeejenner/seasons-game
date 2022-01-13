"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

// VARIABLES
var springWords = ["spring", "blossom", "daffodil", "lamb", "shower", "rainbow", "Easter egg", "umbrella", "breeze", "duckling"];
var summerWords = ["summer", "holiday", "sandcastle", "sunshine", "barbecue", "seaside", "cricket", "picnic", "ice cream", "sunglasses"];
var autumnWords = ["fireworks", "falling leaves", "autumn", "harvest", "equinox", "conker", "pumpkin", "raincoat", "blustery", "squirrel"];
var winterWords = ["mulled wine", "reindeer", "celebration", "snowman", "mistletoe", "sleigh", "winter", "cracker", "snowflake", "decoration"];
var wordsInPlay = "";
var targetWord = "Target word";
var input = "Type word here";
var wordCorrect = false;
var points = 0;
var level = 1;
var inPlay = false;
var body = document.querySelector("body");
var introContainer = document.querySelector(".intro");
var targetContainer = document.querySelector(".target-container");
targetContainer.innerHTML = targetWord;
var inputContainer = document.querySelector(".input-container");
inputContainer.value = input;
var startButton = document.querySelector(".start");
var objectsContainer = document.querySelector(".objects-container"); // EVENT LISTENERS

startButton.addEventListener("click", function (event) {
  event.preventDefault();
  startGame();
  getLevelSettings();
  getTargetWord();
  checkInput();
});
inputContainer.addEventListener("click", function (event) {
  inputContainer.value = "";
});
inputContainer.addEventListener("input", function (event) {
  if (inPlay == true) {
    checkInput();
  }
}); //CLASSES
// Create different types of falling objects

var FallingObject =
/*#__PURE__*/
function () {
  function FallingObject(imgHTML) {
    _classCallCheck(this, FallingObject);

    this.imgHTML = imgHTML;
  }

  _createClass(FallingObject, [{
    key: "getObjectHTML",
    value: function getObjectHTML() {
      var objectHTML = "\n        ".concat(this.imgHTML, "\n      ");
      return objectHTML;
    }
  }, {
    key: "makeObjects",
    value: function makeObjects() {
      for (var i = 0; i < 100; i++) {
        objectsContainer.innerHTML += this.getObjectHTML();
      }
    }
  }]);

  return FallingObject;
}();

var blossom = new FallingObject("<i style=\"color:hotpink;\" class=\"fas fa-spa\"></i>");
var raindrop = new FallingObject("<i style=\"color:blue;\" class=\"fas fa-tint\"></i>");
var leaf = new FallingObject("<i style=\"color:brown;\" class=\"fas fa-leaf\"></i>");
var snowflake = new FallingObject('<i style="color:white;" class="fas fa-snowflake"></i>'); // FUNCTIONS

var startGame = function startGame() {
  inPlay = true;
  points = 0;
  objectsContainer.style.display = "grid";
  targetContainer.style.display = "inline-block";
  inputContainer.style.display = "inline-block";
  introContainer.style.display = "None";
  startButton.style.display = "None";
}; // Change background, falling object and words array for each level
// Increase the speed of falling objects for each level


var getLevelSettings = function getLevelSettings() {
  switch (level) {
    case 1:
      body.className = "spring";
      blossom.makeObjects();
      dropObjects = setInterval(moveObjects, 30);
      wordsInPlay = springWords.map(function (word) {
        return word;
      });
      break;

    case 2:
      body.className = "summer";
      raindrop.makeObjects();
      clearInterval(dropObjects);
      dropObjects = setInterval(moveObjects, 25);
      wordsInPlay = summerWords.map(function (word) {
        return word;
      });
      break;

    case 3:
      body.className = "autumn";
      leaf.makeObjects();
      clearInterval(dropObjects);
      dropObjects = setInterval(moveObjects, 22);
      wordsInPlay = autumnWords.map(function (word) {
        return word;
      });
      break;

    case 4:
      body.className = "winter";
      snowflake.makeObjects();
      clearInterval(dropObjects);
      dropObjects = setInterval(moveObjects, 20);
      wordsInPlay = winterWords.map(function (word) {
        return word;
      });
  }

  objectsContainer.style.bottom = '600px';
}; // Select a random word from the wordsInPlay array and display as target word
// When the array is empty move to the next level


var getTargetWord = function getTargetWord() {
  targetWord = wordsInPlay[Math.floor(Math.random() * wordsInPlay.length)];
  targetContainer.innerHTML = targetWord;

  if (wordsInPlay.length == 0) {
    objectsContainer.innerHTML = "";
    level += 1;

    if (level < 5) {
      getLevelSettings();
      getTargetWord();
      checkInput();
    } else {
      inPlay = false;
      gameOver();
    }
  }
}; // Check user input includes the target word
// If so remove the word from the wordsInPlay array


var checkInput = function checkInput() {
  input = inputContainer.value;

  if (input.includes(targetWord)) {
    wordCorrect = true;
    var index = wordsInPlay.indexOf(targetWord);
    wordsInPlay.splice(index, 1);
    points += 1;
    getTargetWord();
    inputContainer.value = "";
  }
}; // Convert object container bottom position to a number and decrement by 1
// Convert number back to string and set as bottom position so objects move down
// If user inputs correct word, move objects 50px up


var moveObjects = function moveObjects() {
  var bottom = objectsContainer.style.bottom.replace("px", "");
  bottom = Number(bottom);
  bottom -= 1;
  objectsContainer.style.bottom = "".concat(bottom, "px");

  if (wordCorrect == true) {
    objectsContainer.style.bottom = "".concat(bottom + 50, "px");
    wordCorrect = false;
  }

  if (bottom == 0) {
    gameOver();
  }
}; // Repeat the moveObjects function every 30ms so objects appear to be falling
// Clear interval to stop this running when the game is over or not yet started


var dropObjects = setInterval(moveObjects, 30);
clearInterval(dropObjects);

var gameOver = function gameOver() {
  introContainer.style.color = "#000000";

  if (points == 1) {
    introContainer.innerHTML = "Game over. You scored 1 point.";
  } else if (points < 20) {
    introContainer.innerHTML = "Game over. You scored ".concat(points, " points.");
  } else if (points < 40) {
    introContainer.innerHTML = "Great job! You scored ".concat(points, " points.");
  } else {
    introContainer.innerHTML = "Congratulations! You scored the maximum 40 points!";
  }

  resetGame();
};

var resetGame = function resetGame() {
  clearInterval(dropObjects);
  introContainer.style.display = "inline-block";
  targetContainer.style.display = "None";
  inputContainer.style.display = "None";
  objectsContainer.style.display = "None";
  startButton.style.display = "inline-block";
  startButton.innerHTML = "Restart";
  inputContainer.value = "";
  objectsContainer.innerHTML = "";
  level = 1;
};