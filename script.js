
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
// create different types of falling objects

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


const snowflake = new FallingObject(
  '<i style="color:white;" class="fas fa-snowflake"></i>'
);

const leaf = new FallingObject(
  `<i style="color:brown;" class="fas fa-leaf"></i>`
);

const raindrop = new FallingObject(
    `<i style="color:blue;" class="fas fa-tint"></i>`
);

const blossom = new FallingObject(
  `<i style="color:hotpink;" class="fas fa-spa"></i>`
)


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