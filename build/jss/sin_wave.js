// @ts-nocheck
let xspacing = 16; // Distance between each horizontal location
let w; // Width of entire wave
let theta = 0.0; // Start angle at 0
let amplitude = 75.0; // Height of wave
let period = 600.0; // How many pixels before the wave repeats
let dx; // Value for incrementing x
let yvalues; // Using an array to store height values for the wave
let radius = 10;
function setup() {
    const size = getContainerSize();
    x = size.w;
    y = size.h;
    let mycanvas = createCanvas(x, y);
    mycanvas.parent("myContainer"); /* id ile seçiyor classla değil */
    w = width + 16;
    dx = (TWO_PI / period) * xspacing;
    yvalues = new Array(floor(w / xspacing));
    noStroke();
    frameRate(30);
}
function draw() {
    // background(0);
    clear();
    calcWave();
    renderWave();
    drawingContext.fillStyle = "hsl(" + frameCount + ",100%,50%)";
}
function calcWave() {
    // Increment theta (try different values for 
    // 'angular velocity' here)
    theta += 0.02;
    // For every x value, calculate a y value with sine function
    let x = theta;
    for (let i = 0; i < yvalues.length; i++) {
        yvalues[i] = sin(x) * amplitude;
        x += dx;
    }
}
function renderWave() {
    // A simple way to draw the wave with an ellipse at each location
    // beginShape()
    for (let x = 0; x < yvalues.length; x++) {
        ellipse(x * xspacing, height / 2 + yvalues[x], radius, radius);
    }
    // endShape();
}
