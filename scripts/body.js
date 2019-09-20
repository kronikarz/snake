let body = {
  position: {
    xCenter: [25, 15], yCenter: [15, 15]
  },
  length: 2
};

function getBodyPosition() {
  return body.position;
}

function moveBodyPosition() {
  calculateBodyPosition();
  body.position.xCenter.pop();
  body.position.yCenter.pop();
}

function extendBody() {
  calculateBodyPosition();
  body.length += 1;
}

function calculateBodyPosition() {
  body.position.xCenter.unshift(getLastHeadPosition().xCenter);
  body.position.yCenter.unshift(getLastHeadPosition().yCenter);
}