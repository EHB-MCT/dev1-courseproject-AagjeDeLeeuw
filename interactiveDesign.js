"use strict";

import context from "./context.js";
import * as Utils from "./utils.js";

let width = context.canvas.width;
let height = context.canvas.height;

let index = 0;

let numberOfCircles = 25;
let lineWidth = 25;
let maxRadius = Math.min((width * 3) / 4, (height * 3) / 4);
let defaultOpacity = 50;

let bubbles = [];
let rainbows = [];

signature(50);

function signature(size) {
	context.fillStyle = "black";
	context.fillRect(width - 300, height - 300, width, height);
	context.fillStyle = "#ae73d9";
	context.fillRect(width - 225, height - 225, size, size);
	context.fillRect(width - 125, height - 225, size, size);
	context.fillRect(width - 225, height - 125, size, size);
	context.fillRect(width - 125, height - 125, size, size);
	context.fillRect(width - 275, height - 75, 2 * size, size);
	context.fillRect(width - 125, height - 75, 2 * size, size);
}

makeBubbles(250);

function makeBubbles(numberOfBubbles) {
	for (let i = 0; i < numberOfBubbles; i++) {
		makeBubble();
	}
}

function makeBubble() {
	bubbles.push({
		x: Utils.randomNumber(0, width),
		y: Utils.randomNumber(0, height),
		radius: Utils.randomNumber(10, 70),
		color: Utils.randomNumber(190, 240),
	});
}

function drawBubbles() {
	for (let i = 0; i < bubbles.length; i++) {
		let bubble = bubbles[i];
		context.fillStyle = Utils.hsla(bubble.color, 100, 50, (2 / 3) * 100);
		Utils.fillCircle(bubble.x, bubble.y, bubble.radius);
	}
}

makeRainbows();

function makeRainbows() {
	rainbows.push({
		x: 0,
		y: 0,
		circles: [],
	});
	rainbows.push({
		x: width,
		y: height,
		circles: [],
	});

	for (let i = 0; i < rainbows.length; i++) {
		for (let j = numberOfCircles; j >= 0; j--) {
			rainbows[i].circles.push(makeCircle(rainbows[i].x, rainbows[i].y, j));
		}
	}
}

function makeCircle(x, y, i) {
	return {
		x: x,
		y: y,
		// Red is 0 and violet is 270
		color: (i * 320) / numberOfCircles,
		opacity: defaultOpacity,
		radius: maxRadius - (i * maxRadius) / numberOfCircles,
	};
}

function drawRainbowCircles() {
	for (let i = 0; i < rainbows.length; i++) {
		context.fillStyle = "white";
		Utils.fillCircle(rainbows[i].x, rainbows[i].y, maxRadius + lineWidth / 2);
		let rainbow = rainbows[i];
		for (let j = 0; j < rainbow.circles.length; j++) {
			let circle = rainbow.circles[j];
			context.lineWidth = lineWidth;
			context.strokeStyle = Utils.hsla(circle.color, 100, 50, circle.opacity);
			Utils.strokeCircle(circle.x, circle.y, circle.radius);
		}
	}
}

animate();

function animate() {
	context.clearRect(0, 0, width, height);

	let current = index % numberOfCircles;
	let previous = (index - 1 + numberOfCircles) % numberOfCircles;

	for (let i = 0; i < rainbows.length; i++) {
		rainbows[i].circles[current].opacity = 100;
		rainbows[i].circles[previous].opacity = defaultOpacity;
	}

	drawBubbles();
	drawRainbowCircles();
    signature(50);
	index++;
	requestAnimationFrame(animate);
}