// @ts-nocheck
let arr = [];
let step = 0
let theta = 0;
let circ;
var panel = QuickSettings.create(10, 10, "Panel");
var options = {
    col: 1000,

}
panel.bindRange("col", 0, 1517, 40, 1, options);
panel.addBoolean("animate", true, (val) => {
    (val) ? loop(): noLoop();
});
panel.setKey("h");

function setup() {
    const size = getContainerSize();
    x = size.w;
    y = size.h;
    let mycanvas = createCanvas(x, y);
    mycanvas.parent("myContainer"); /* id ile seçiyor classla değil */
    // fill("#FF9F1C");
    /*istersen gölge ekle */
    // drawingContext.shadowOffsetX = 1;
    // drawingContext.shadowOffsetY = -1;
    // drawingContext.shadowBlur = 5;
    // drawingContext.shadowColor = "black";
    // strokeWeight(.5);
    noStroke();
    ellipseMode(CENTER);
    // rectMode(CENTER);
    noFill();
    angleMode(DEGREES);
    pixelDensity(1);
    colorMode(HSB, 100);
    for (var y = 0; y < height; y += 50) {
        for (var x = 0; x < width; x += 50) {
            arr.push({ vec: createVector(x, y), col: noise(theta) });
            theta += .1;
        }
    }
    circ = createVector(random(width), random(height));
    step = createVector(random(width), random(height));
}

function draw() {
    clear();
    for (var i = 0; i < arr.length; i++) {
        let bu = arr[i];

        let dst = bu.vec.dist(circ);
        circ.lerp(step, .0002);
        (circ.dist(step) < 10) && (step = createVector(random(width), random(height)));
        let c = map(dst, 0, options.col, 0, 100);
        fill(c, 100, 100)
        rect(bu.vec.x, bu.vec.y, 50, 50)
    }

}

function getRandomColor() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);

}
