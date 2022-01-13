
// VARIABLES

const springWords = ["spring", "blossom", "daffodil", "lamb", "shower", "rainbow", "Easter egg", "umbrella", "breeze", "duckling"];
const summerWords = ["summer", "holiday", "sandcastle", "sunshine", "barbecue", "seaside", "cricket", "picnic", "ice cream", "sunglasses"];
const autumnWords = ["fireworks", "falling leaves", "autumn", "harvest", "equinox", "conker", "pumpkin", "raincoat", "blustery", "squirrel"];
const winterWords = ["mulled wine", "reindeer", "celebration", "snowman", "mistletoe", "sleigh", "winter", "cracker", "snowflake", "decoration"];
let wordsInPlay = "";
let targetWord = "Target word";
let input = "Type word here";
let wordCorrect = false;
let points = 0;
let level = 1;
let inPlay = false;

const body = document.querySelector("body");
const introContainer = document.querySelector(".intro");

const targetContainer = document.querySelector(".target-container");
targetContainer.innerHTML = targetWord;

const inputContainer = document.querySelector(".input-container");
inputContainer.value = input;

const startButton = document.querySelector(".start");
const objectsContainer = document.querySelector(".objects-container");


// EVENT LISTENERS

startButton.addEventListener("click", (event) => {
    event.preventDefault();
    startGame();
    getLevelSettings();
    getTargetWord();
    checkInput();

})

inputContainer.addEventListener("click", (event) => {
    inputContainer.value = "";
})

inputContainer.addEventListener("input", (event) => {
    if (inPlay == true) {
        checkInput();
    }
})

//CLASSES
// Create different types of falling objects

class FallingObject {
    constructor(imgHTML) {
        this.imgHTML = imgHTML;
    }

    getObjectHTML() {
        const objectHTML = `
        ${this.imgHTML}
      `
      return objectHTML;
        }

    makeObjects() {
      for (let i = 0; i < 100; i++) {
          objectsContainer.innerHTML += this.getObjectHTML();
        }
      }
    }


const blossom = new FallingObject(
  `<i style="color:hotpink;" class="fas fa-spa"></i>`
);

const raindrop = new FallingObject(
  `<i style="color:blue;" class="fas fa-tint"></i>`
);

const leaf = new FallingObject(
  `<i style="color:brown;" class="fas fa-leaf"></i>`
);

const snowflake = new FallingObject(
  '<i style="color:white;" class="fas fa-snowflake"></i>'
);


// FUNCTIONS

const startGame = () => {
  inPlay = true;
  points = 0;
  objectsContainer.style.display = "grid";
  targetContainer.style.display = "inline-block";
  inputContainer.style.display = "inline-block";
  introContainer.style.display = "None";
  startButton.style.display = "None";
}

// Change background, falling object and words array for each level
// Increase the speed of falling objects for each level
const getLevelSettings = () => {
  switch (level) {
      case 1:
          body.className = "spring";
          blossom.makeObjects();
          dropObjects = setInterval(moveObjects, 30);
          wordsInPlay = springWords.map((word) => word);
          break;
      case 2:
          body.className = "summer";
          raindrop.makeObjects();
          clearInterval(dropObjects);
          dropObjects = setInterval(moveObjects, 25);
          wordsInPlay = summerWords.map((word) => word);
          break;
      case 3:
          body.className = "autumn";
          leaf.makeObjects();
          clearInterval(dropObjects);
          dropObjects = setInterval(moveObjects, 22);
          wordsInPlay = autumnWords.map((word) => word);
          break;
      case 4:
          body.className = "winter";
          snowflake.makeObjects();
          clearInterval(dropObjects);
          dropObjects = setInterval(moveObjects, 20);
          wordsInPlay = winterWords.map((word) => word);
  }
  objectsContainer.style.bottom = '600px';
}

// Select a random word from the wordsInPlay array and display as target word
// When the array is empty move to the next level
const getTargetWord = () => {
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
}

// Check user input includes the target word
// If so remove the word from the wordsInPlay array
const checkInput = () => {
  input = inputContainer.value;
  if (input.includes(targetWord)) {
      wordCorrect = true;
      const index = wordsInPlay.indexOf(targetWord);
      wordsInPlay.splice(index, 1);
      points += 1;
      getTargetWord();
      inputContainer.value = "";
  }
}

// Convert object container bottom position to a number and decrement by 1
// Convert number back to string and set as bottom position so objects move down
// If user inputs correct word, move objects 50px up
const moveObjects = () => {
  let bottom = objectsContainer.style.bottom.replace("px", "");
  bottom = Number(bottom);
  bottom -= 1;
  objectsContainer.style.bottom = `${bottom}px`;
  if (wordCorrect == true) {
      objectsContainer.style.bottom = `${bottom + 50}px`;
      wordCorrect = false;
  }
  if (bottom == 0) {
      gameOver();
  }
}

// Repeat the moveObjects function every 30ms so objects appear to be falling
// Clear interval to stop this running when the game is over or not yet started
let dropObjects = setInterval(moveObjects, 30);
clearInterval(dropObjects);


const gameOver = () => {
  introContainer.style.color = "#000000";
  if (points == 1) {
      introContainer.innerHTML = "Game over. You scored 1 point.";
  } else if (points < 20) {
      introContainer.innerHTML = `Game over. You scored ${points} points.`;
  } else if (points < 40) {
      introContainer.innerHTML = `Great job! You scored ${points} points.`;
  } else {
      introContainer.innerHTML = "Congratulations! You scored the maximum 40 points!";
  }
  resetGame();
}

const resetGame = () => {
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
}