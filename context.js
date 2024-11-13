//https://github.com/EHB-MCT/DEV1_Solutions_24/blob/main/scripts/context.js, Peter Dickx, 13/11/2024

/** @type {CanvasRenderingContext2D} */
let context;

setupCanvasContext();

export default context;

function setupCanvasContext() {
    let canvas = document.querySelector("canvas");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    context = canvas.getContext("2d");
}

window.onresize = reload;

function reload() {
    window.location.reload();
}