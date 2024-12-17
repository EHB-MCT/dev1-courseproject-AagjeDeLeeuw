"use strict";

import context from "./context.js";
import * as Utils from "./utils.js";

let width = context.canvas.width;
let height = context.canvas.height;

drawBubbles(250);
drawRainbowCircles(25);
drawRainbowCircles(25, width, height);

function drawRainbowCircles(numberOfCircles, x = 0, y = 0) {
	let maxRadius = 750;
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

function drawBubbles(bubbles) {
	for (let i = 0; i < bubbles; i++) {
		let hue = Utils.randomNumber(200, 260);
		context.fillStyle = Utils.hsla(hue, 100, 50, (2 / 3) * 100);
		let x = Utils.randomNumber(0, width);
		let y = Utils.randomNumber(0, height);
		Utils.fillCircle(x, y, Utils.randomNumber(10, 70));
	}
}

signature();

function signature() {
	let size = 50;
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
