"use strict";

let canvas = document.querySelector("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let context = canvas.getContext("2d");

let size = 50;

function signature() {
 
    context.fillRect(0, 0, 300, 300);
    context.fillStyle = "#ae73d9";
    context.fillRect(75, 75, size, size);
    context.fillRect(175, 75, size, size);
    context.fillRect(25, 225, size, size);
    context.fillRect(75, 225, size, size);
    context.fillRect(75, 175, size, size);
    context.fillRect(175, 175, size, size);
    context.fillRect(175, 225, size, size);
    context.fillRect(225, 225, size, size);
}

signature();