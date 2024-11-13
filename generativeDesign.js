"use strict";

import context from "./context.js";
import * as Utils from "./utils.js";

let width = context.canvas.width;
let height = context.canvas.height;

drawRainbowCircles(25);
drawRainbowCircles(25, width, height);

function drawRainbowCircles(numberOfCircles, x = 0, y = 0) {
    let maxRadius = 750;

    for (let i = 0; i < numberOfCircles; i++) {
        // Red is 0 and violet is 270
        let hue = (i * 320) / numberOfCircles;
        let radius = maxRadius - (i * maxRadius / numberOfCircles);

        context.lineWidth = 25;
        context.strokeStyle = Utils.hsl(hue, 100, 50);
        Utils.strokeCircle(x, y, radius);
    }
}

drawBubbles();

function drawBubbles() {
    context.fillStyle = "blue"
    Utils.fillCircle(width/2, height/2, 50)
}
