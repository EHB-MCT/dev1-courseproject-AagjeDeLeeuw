"use strict";

import context from "./context.js";
import * as Utils from "./utils.js";

let width = context.canvas.width;
let height = context.canvas.height;

drawRainbowCircles(25);

function drawRainbowCircles(numberOfCircles) {
    for (let i = 0; i < numberOfCircles; i++) {
        let radius = 750 / numberOfCircles
        let hue = 300 / numberOfCircles;
        context.strokeStyle = Utils.hsl(i * hue, 100, 50);
        context.lineWidth = 25;
        Utils.strokeCircle(0, 0, 750 - i * radius);
        console.log("Drawing circle " + i);
    }
}