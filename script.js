
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
let interval = 30;

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

const makeBlossoms = () => {
    for (let i = 0; i < 100; i++) {
        objectsContainer.innerHTML += blossom.getObjectHTML();
      }
}

const makeRaindrops = () => {
    for (let i = 0; i < 100; i++) {
        objectsContainer.innerHTML += raindrop.getObjectHTML();
      }
}

const makeLeaves = () => {
    for (let i = 0; i < 100; i++) {
        objectsContainer.innerHTML += leaf.getObjectHTML();
      }
}

const makeSnowflakes = () => {
    for (let i = 0; i < 100; i++) {
        objectsContainer.innerHTML += snowflake.getObjectHTML();
      }
}