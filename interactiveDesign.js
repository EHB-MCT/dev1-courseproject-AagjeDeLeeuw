// Portions of this project were developed using suggestions generated by ChatGPT (OpenAI)
// 18/12/2024: https://chatgpt.com/share/6763319e-7be4-800a-bf41-0b62220c70f5
// Modifications made by Aagje De Leeuw

"use strict";

import context from "./context.js";
import * as Utils from "./utils.js";

let width = context.canvas.width;
let height = context.canvas.height;

let index = 0;
let lastTime = 0;

let directionX = 1;
let directionY = 1;

let numberOfCircles = 25;
let lineWidth = 25;
let maxRadius = Math.min((width * 3) / 4, (height * 3) / 4);
let defaultOpacity = 50;

let bubbles = [];
let rainbows = [];

window.onmousemove = moveAndColorBubbles;

signature(50);
makeBubbles(250);
makeRainbows();
animate();

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

function makeBubbles(numberOfBubbles) {
	let colorBubbles = Utils.randomNumber(0, 360);
	for (let i = 0; i < numberOfBubbles; i++) {
		bubbles.push({
			x: Utils.randomNumber(0, width),
			y: Utils.randomNumber(0, height),
			radius: Utils.randomNumber(10, 70),
			color: colorBubbles,
		});
	}
}

function drawBubbles() {
	for (let i = 0; i < bubbles.length; i++) {
		let bubble = bubbles[i];
		context.fillStyle = Utils.hsla(bubble.color, 100, 50, (2 / 3) * 100);
		Utils.fillCircle(bubble.x, bubble.y, bubble.radius);
	}
}

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
			rainbows[i].circles.push({
				// Red is 0 and violet is 270
				color: (j * 320) / numberOfCircles,
				opacity: defaultOpacity,
				radius: maxRadius - (j * maxRadius) / numberOfCircles,
			});
		}
	}
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
			Utils.strokeCircle(rainbow.x, rainbow.y, circle.radius);
		}
	}
}

/**
 *
 * @param{MouseEvent} eventData
 */

function moveAndColorBubbles(eventData) {
	if (eventData.pageX < width / 2 && eventData.pageY < height / 2) {
		directionX = -1;
		directionY = -1;
	} else if (eventData.pageX > width / 2 && eventData.pageY < height / 2) {
		directionX = 1;
		directionY = -1;
	} else if (eventData.pageX < width / 2 && eventData.pageY > height / 2) {
		directionX = -1;
		directionY = 1;
	} else {
		directionX = 1;
		directionY = 1;
	}

	// This code was partially generated with ChatGPT (OpenAI) on 18/12/2024

	let mouseX = eventData.pageX;
	let mouseY = eventData.pageY;

	for (let i = 0; i < rainbows.length; i++) {
		let rainbow = rainbows[i];
		let dx = mouseX - rainbow.x;
		let dy = mouseY - rainbow.y;
		let dist = Math.sqrt(dx * dx + dy * dy);
		for (let j = 0; j < rainbow.circles.length; j++) {
			let circle = rainbow.circles[j];
			let radius = circle.radius;
			if (dist >= radius - lineWidth / 2 && dist <= radius + lineWidth / 2) {
				for (let i = 0; i < bubbles.length; i++) {
					bubbles[i].color = circle.color;
				}
			}
		}
	}
}

function animate(currentTime) {
	context.clearRect(0, 0, width, height);

	if (currentTime - lastTime > 1000 / 18) {
		lastTime = currentTime;

		let prePrevious = ((index - 2 + numberOfCircles) % numberOfCircles) + 1;
		let previous = ((index - 1 + numberOfCircles) % numberOfCircles) + 1;
		let current = (index % numberOfCircles) + 1;
		let next = ((index + 1) % numberOfCircles) + 1;
		let postNext = ((index + 2) % numberOfCircles) + 1;

		for (let i = 0; i < rainbows.length; i++) {
			rainbows[i].circles[prePrevious].opacity = defaultOpacity;
			rainbows[i].circles[previous].opacity =
				defaultOpacity + (100 - defaultOpacity) / 2;
			rainbows[i].circles[current].opacity = 100;
			rainbows[i].circles[next].opacity =
				defaultOpacity + (100 - defaultOpacity) / 2;
			rainbows[i].circles[postNext].opacity = defaultOpacity;
		}
		index++;
	}

	for (let i = 0; i < bubbles.length; i++) {
		bubbles[i].x += directionX;
		bubbles[i].y += directionY;
		if (bubbles[i].x < 0 - bubbles[i].radius) {
			bubbles[i].x = width + bubbles[i].radius;
		} else if (bubbles[i].x > width + bubbles[i].radius) {
			bubbles[i].x = 0 - bubbles[i].radius;
		}
		if (bubbles[i].y < 0 - bubbles[i].radius) {
			bubbles[i].y = height + bubbles[i].radius;
		} else if (bubbles[i].y > height + bubbles[i].radius) {
			bubbles[i].y = 0 - bubbles[i].radius;
		}
	}

	drawBubbles();
	drawRainbowCircles();
	signature(50);

	requestAnimationFrame(animate);
}
