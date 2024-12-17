"use strict";

import context from "./context.js";
import * as Utils from "./utils.js";

let width = context.canvas.width;
let height = context.canvas.height;
let bubbles = [];

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

drawRainbowCircles(25, width, height);
drawRainbowCircles(25);

function drawRainbowCircles(numberOfCircles, x = 0, y = 0) {
	let maxRadius = Math.min(width * 0.75, height * 0.75);
	context.fillStyle = "white";
	Utils.fillCircle(x, y, maxRadius);
	for (let i = 0; i < numberOfCircles; i++) {
		// Red is 0 and violet is 270
		let hue = (i * 320) / numberOfCircles;
		let radius = maxRadius - (i * maxRadius) / numberOfCircles;
		context.lineWidth = 25;
		context.strokeStyle = Utils.hsl(hue, 100, 50);
		Utils.strokeCircle(x, y, radius);
	}
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
