"use strict";

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
var interval = 30;
var body = document.querySelector("body");
var introContainer = document.querySelector(".intro");
var targetContainer = document.querySelector(".target-container");
targetContainer.innerHTML = targetWord;
var inputContainer = document.querySelector(".input-container");
inputContainer.value = input;
var startButton = document.querySelector(".start"); // EVENT LISTENERS

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
});