// @ts-nocheck
let arr = [];
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
    strokeWeight(1.5);
    ellipseMode(CENTER);
    rectMode(CENTER);
    angleMode(DEGREES);
    colorMode(HSB, 360, 100, 100);
    // noFill();
    noStroke();
    console.log("second");
    for (let a = 0; a < 20; a++) {
        arr.push(new Mover());
    }
    fill("black");
}
function draw() {
    background(124, 0, 100);
    for (let i = 0; i < arr.length; i++) {
        arr[i].update();
        arr[i].show();
    }
}
function mousePressed() {
    arr.push(new Mover(mouseX, mouseY));
}
function getRandomColor() {
    let letters = '0123456789ABCDEF'.split('');
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}
function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}
function Mover(x, y) {
    this.pos = createVector(x || random(width), y || random(height));
    this.hist = [];
    this.target = createVector(random(width), random(height));
}
Mover.prototype.update = function () {
    this.old = this.pos.copy();
    this.hist.push(this.old);
    this.pos.lerp(this.target, .02);
    (this.hist.length > 30) && (this.hist.splice(0, 1));
    (this.pos.dist(this.target) < 10) && (this.target = createVector(random(width), random(height)));
};
Mover.prototype.show = function () {
    for (let i = 0; i < this.hist.length; i++) {
        fill((map(i, 0, this.hist.length, 0, 360)), 100, 100);
        let size = map(i, 0, this.hist.length, 10, 30);
        let bu = this.hist[i];
        bu.x += random(-2, 2);
        bu.y += random(-2, 2);
        // stroke(getRandomColor());
        rect(bu.x, bu.y, size, size);
    }
};
