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

var snowflake = new FallingObject('<i style="color:white;" class="fas fa-snowflake"></i>');
var leaf = new FallingObject("<i style=\"color:brown;\" class=\"fas fa-leaf\"></i>");
var raindrop = new FallingObject("<i style=\"color:blue;\" class=\"fas fa-tint\"></i>");
var blossom = new FallingObject("<i style=\"color:hotpink;\" class=\"fas fa-spa\"></i>"); // FUNCTIONS

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
}; // Select a random word then remove it from the array
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
};