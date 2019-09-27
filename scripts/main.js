let canvas = document.getElementById("canvasGameArea");
let ctx = canvas.getContext("2d");

const AREA_WIDTH_INT = canvas.width;
const AREA_HEIGHT_INT = canvas.height;
const SNAKE_STEP_INT = 10;
const SPEED_TIMEOUT = [900, 900, 800, 700, 600, 500, 400, 300, 200, 100];

const scoreInput = document.getElementById("scoreInput");
const startBtn = document.getElementById("startBtn");
startBtn.addEventListener("click", function () {
  init();
});

let directionStr = `Right`;
let gameStartBoolean = true;
let GAME_LOOP;
let scoreIncrement = 1;
let score = 0;
let timeoutInt = SPEED_TIMEOUT[1];

window.addEventListener("keydown", function (event) {
  if (event.defaultPrevented) {
    return; // Do nothing if the event was already processed
  }
  switch (event.key) {
    case `Right`: // IE/Edge specific value
    case `ArrowRight`:
      if ((directionStr !== `Left`) && (directionStr !== `ArrowLeft`)) {
        directionStr = event.key;
      }
      break;
    case `Left`: // IE/Edge specific value
    case `ArrowLeft`:
      if ((directionStr !== `Right`) && (directionStr !== `ArrowRight`)) {
        directionStr = event.key;
      }
      break;
    case `Up`: // IE/Edge specific value
    case `ArrowUp`:
      if ((directionStr !== `Down`) && (directionStr !== `ArrowDown`)) {
        directionStr = event.key;
      }
      break;
    case `Down`: // IE/Edge specific value
    case `ArrowDown`:
      if ((directionStr !== `Up`) && (directionStr !== `ArrowUp`)) {
        directionStr = event.key;
      }
      break;
  }

}, true);

function chooseSpeed(speed) {
  timeoutInt = SPEED_TIMEOUT[speed];
  scoreIncrement = speed;
  init();
}

//setInterval is making main() loop
function init() {
  resetHeadPosition();
  resetBodyPosition();
  resetFoodPosition();
  score = 0;
  scoreInput.value = score.toString();
  gameStartBoolean = true;
  canvas.focus();
  clearTimeout(GAME_LOOP);
  GAME_LOOP = setInterval(main, timeoutInt);
}

function main() {
  moveHeadPosition(directionStr, SNAKE_STEP_INT);
  checkCollisionWithArena();
  checkCollisionWithBody();

  ctx.clearRect(0, 0, AREA_WIDTH_INT, AREA_HEIGHT_INT);
  drawHead();
  moveBodyPosition();
  drawBody();

  if (isFoodEaten()) {
    extendBody();
    score += scoreIncrement;
    scoreInput.value = score.toString();
    calculateFoodPosition(AREA_WIDTH_INT, AREA_HEIGHT_INT);
  } else if (gameStartBoolean) {
    calculateFoodPosition(AREA_WIDTH_INT, AREA_HEIGHT_INT);
    gameStartBoolean = false;
  }
  drawFood();
}

function drawHead() {
  //drawing triangle clockwise
  ctx.beginPath();
  ctx.moveTo(getHeadPosition().x1, getHeadPosition().y1);
  ctx.lineTo(getHeadPosition().x2, getHeadPosition().y2);
  ctx.lineTo(getHeadPosition().x3, getHeadPosition().y3);
  ctx.lineTo(getHeadPosition().x1, getHeadPosition().y1);
  ctx.fillStyle = "#00ff00";
  ctx.fill();
  ctx.stroke();
  ctx.closePath();
}

function drawBody() {
  const RADIUS = 5;
  const COLOR = "#00ff00"
  for (let i = 0; i < body.length; i++) {
    drawCircle(getBodyPosition().xCenter[i], getBodyPosition().yCenter[i], RADIUS, COLOR)
  }
}

function drawFood() {
  const RADIUS = 3;
  const COLOR = "#ff0000"
  drawCircle(getFoodPosition().xCenter, getFoodPosition().yCenter, RADIUS, COLOR)
}

function drawCircle(positionX, positionY, radius, color) {
  ctx.beginPath();
  ctx.arc(positionX, positionY, radius, 0, 2 * Math.PI);
  ctx.fillStyle = color;
  ctx.fill();
  ctx.stroke();
  ctx.closePath();
}

function checkCollisionWithArena() {
  if (getHeadPosition().xCenter > AREA_WIDTH_INT
    || getHeadPosition().xCenter < 0
    || getHeadPosition().yCenter > AREA_HEIGHT_INT
    || getHeadPosition().yCenter < 0) {
    clearTimeout(GAME_LOOP);
  }
}

function checkCollisionWithBody() {
  for (let i = 0; i < body.length; i++) {
    if (getHeadPosition().xCenter === getBodyPosition().xCenter[i]
      && getHeadPosition().yCenter === getBodyPosition().yCenter[i]) {
      clearTimeout(GAME_LOOP);
    }
  }
}