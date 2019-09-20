let head = {
	//drawing triangle clockwise
	position: {
		xCenter: 35, yCenter: 15,
		x1: 0, y1: 0,
		x2: 0, y2: 0,
		x3: 0, y3: 0
	},

	lastPosition: {
		xCenter: 25, yCenter: 15,
	},

	rightDirection: {
		x1: +5, y1: +0,
		x2: -5, y2: +5,
		x3: -5, y3: -5
	},

	leftDirection: {
		x1: -5, y1: +0,
		x2: +5, y2: -5,
		x3: +5, y3: +5
	},

	upDirection: {
		x1: +0, y1: -5,
		x2: +5, y2: +5,
		x3: -5, y3: +5
	},

	downDirection: {
		x1: +0, y1: +5,
		x2: -5, y2: -5,
		x3: +5, y3: -5
	}
};

function getHeadPosition() {
	return head.position;
}

function getLastHeadPosition() {
	return head.lastPosition;
}

function moveHeadPosition(directionStr, speedInt) {
	switch (directionStr) {
		case `Right`: // IE/Edge specific value
		case `ArrowRight`:
			setHeadLastPosition();
			head.position.xCenter += speedInt;
			setDirection(head.rightDirection);
			break;
		case `Left`: // IE/Edge specific value
		case `ArrowLeft`:
			setHeadLastPosition();
			head.position.xCenter -= speedInt;
			setDirection(head.leftDirection);
			break;
		case `Up`: // IE/Edge specific value
		case `ArrowUp`:
			setHeadLastPosition();
			head.position.yCenter -= speedInt;
			setDirection(head.upDirection);
			break;
		case `Down`: // IE/Edge specific value
		case `ArrowDown`:
			setHeadLastPosition();
			head.position.yCenter += speedInt;
			setDirection(head.downDirection);
			break;
	}
}

function setHeadLastPosition() {
	head.lastPosition.xCenter = head.position.xCenter;
	head.lastPosition.yCenter = head.position.yCenter;
}

function setDirection(headDirection) {
	head.position.x1 = head.position.xCenter + headDirection.x1;
	head.position.x2 = head.position.xCenter + headDirection.x2;
	head.position.x3 = head.position.xCenter + headDirection.x3;

	head.position.y1 = head.position.yCenter + headDirection.y1;
	head.position.y2 = head.position.yCenter + headDirection.y2;
	head.position.y3 = head.position.yCenter + headDirection.y3;
}