// @ts-nocheck
let arr = [];
let att = [];
function setup() {
    const size = getContainerSize();
    x = size.w;
    y = size.h;
    let mycanvas = createCanvas(x, y);
    mycanvas.parent("myContainer"); /* id ile seçiyor classla değil */
    fill("#FF9F1C");
    /*istersen gölge ekle */
    // drawingContext.shadowOffsetX = 1;
    // drawingContext.shadowOffsetY = -1;
    // drawingContext.shadowBlur = 5;
    // drawingContext.shadowColor = "black";
    ellipseMode(CENTER);
    strokeWeight(4);
    noFill();
    // colorMode(HSB, 100);
    for (let x = 0; x < width; x += 25) {
        for (let y = 0; y < height; y += 25) {
            arr.push(new Particle(x, y));
        }
    }
    colorMode(HSB);
}
function draw() {
    clear();
    // background(100, 10);
    point(att.x, att.y);
    for (let i = 0, len = att.length; i < len; i++) {
        point(att[i].x, att[i].y);
    }
    for (let i = 0, len = arr.length; i < len; i++) {
        for (let z = 0; z < att.length; z++) {
            arr[i].attract(att[z]);
        }
        arr[i].update();
        arr[i].show();
    }
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
function mousePressed() {
    att.push(createVector(mouseX, mouseY));
}
function Particle(x, y) {
    this.pos = (x !== undefined && y !== undefined) ? createVector(x, y) : createVector(random(width), random(height));
    this.vel = createVector();
    this.acc = createVector();
    this.stop = false;
}
Particle.prototype.update = function () {
    this.vel.add(this.acc);
    this.vel.limit(2);
    this.pos.add(this.vel);
    this.acc.mult(0);
    (this.pos.x > width + 15) && (this.pos.x = -15);
    (this.pos.x < -15) && (this.pos.x = width + 15);
    (this.pos.y > height + 15) && (this.pos.y = -15);
    (this.pos.y < -15) && (this.pos.y = height + 15);
};
Particle.prototype.show = function () {
    point(this.pos.x, this.pos.y);
};
Particle.prototype.attract = function (target) {
    let force = p5.Vector.sub(target, this.pos);
    let d = force.mag();
    d = constrain(d, 1, 25);
    // let clr = map(target.dist(this.pos), 0, 1517, 0, 360);
    // stroke(clr, 100, 100)
    let G = 10;
    let strength = G / (d * d);
    force.setMag(strength);
    if (d < 23) {
        force.mult(-10);
    }
    this.acc.add(force);
};
