"use strict";

import context from "./context.js";
import * as Utils from "./utils.js";

let width = context.canvas.width;
let height = context.canvas.height;

let index = 0;
let numberOfCircles = 25;
let lineWidth = 25;
let maxRadius = Math.min((width * 3) / 4, (height * 3) / 4);

let bubbles = [];
let circles = [];

drawBubbles(250);

function drawBubbles(numberOfBubbles) {
	for (let i = 0; i < numberOfBubbles; i++) {
		makeBubble();
	}
	for (let i = 0; i < bubbles.length; i++) {
		let bubble = bubbles[i];
		context.fillStyle = Utils.hsla(bubble.color, 100, 50, (2 / 3) * 100);
		Utils.fillCircle(bubble.x, bubble.y, bubble.radius);
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

rainbowCircles(numberOfCircles);
rainbowCircles(numberOfCircles, width, height);

function rainbowCircles(numberOfCircles, x = 0, y = 0) {
	makeRainbowCircle(numberOfCircles, x, y);
	drawRainbowCircles(numberOfCircles, x, y);
}

function makeRainbowCircle(numberOfCircles, x = 0, y = 0) {
	context.fillStyle = "white";
	Utils.fillCircle(x, y, maxRadius + lineWidth / 2);

	for (let i = 0; i < numberOfCircles; i++) {
		makeCircle(i, numberOfCircles);
	}
}

function drawRainbowCircles(numberOfCircles, x = 0, y = 0) {
	for (let i = 0; i < circles.length; i++) {
		let circle = circles[i];
		context.lineWidth = lineWidth;
		context.strokeStyle = Utils.hsla(circle.color, 100, 50, circle.opacity);
		Utils.strokeCircle(x, y, circle.radius);
	}
}

function makeCircle(i, numberOfCircles) {
	circles.push({
		// Red is 0 and violet is 270
		color: (i * 320) / numberOfCircles,
		opacity: 50,
		radius: maxRadius - (i * maxRadius) / numberOfCircles,
	});
}

animate();

function animate() {
	context.clearRect(0, 0, width, height);

	let current = index % circles.length;
	let previous = (index - 1 + circles.length) % circles.length;

	circles[current].opacity = 100;
	circles[previous].opacity = 50;

	drawBubbles();

	rainbowCircles();
	rainbowCircles();

	index++;
	requestAnimationFrame(animate);
}

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
