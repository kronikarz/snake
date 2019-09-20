let food = {
  position: {
    xCenter: 0, yCenter: 0
  }
};

function getFoodPosition() {
  return food.position;
}

function calculateFoodPosition(areaWidth, areaHeight) {
  food.position.xCenter = calculatePositionRecursive(areaWidth, getHeadPosition().xCenter, getBodyPosition().xCenter);
  food.position.yCenter = calculatePositionRecursive(areaHeight, getHeadPosition().yCenter, getBodyPosition().yCenter);
}

function calculatePositionRecursive(border, headPosition, bodyPosition) {
  let position = getRandomInt(1, border);

  //we need values that end with "5"
  //in other case head position and food position won't cover
  if (position % 10 === 0) {
    position += 5;
  }

  if (headPosition === position || bodyPosition.includes(position)) {
    return calculatePositionRecursive(border, headPosition, bodyPosition);
  }
  return position;
}

function getRandomInt(min, max) {
  max = (max - 5) / 5;
  return (Math.floor(Math.random() * (max - min)) + min) * 5;
}

function isFoodEaten() {
  return getHeadPosition().xCenter === food.position.xCenter && getHeadPosition().yCenter === food.position.yCenter;
}