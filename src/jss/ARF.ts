// @ts-nocheck
// A system of particles that respond to Attraction / Repulsion Forces.

let particles = [];

function setup() {

    const size = getContainerSize();
    x = size.w;
    y = size.h;
    let mycanvas = createCanvas(x, y);
    mycanvas.parent("myContainer"); /* id ile seçiyor classla değil */
    colorMode(HSB, width, width, width);

    /*istersen gölge ekle */
    // drawingContext.shadowOffsetX = 1;
    // drawingContext.shadowOffsetY = -1;
    // drawingContext.shadowBlur = 5;
    // drawingContext.shadowColor = "black";

    p = new particle(width / 2, height / 2);
    a = new particle(200, 200);
    for (let i = 0; i < 200; i++) {
        particles.push(new particle(random(width), random(height)));
    }

}

function draw() {
    background("#fff")
    for (let i = 0; i < particles.length; i++) {

        stroke(particles[i].color, width, width);
        particles[i].update();
        beginShape();
        particles[i].show();
        endShape(CLOSE);
        particles[i].check_loc();
        if (i != particles.length) {
            particles[i].attracted(particles[particles.length - 1].pos);
        }

    }
}

function mousePressed() {
    particles.push(new particle(mouseX, mouseY));
}


function particle(x, y) {

    this.pos = createVector(x, y);
    this.acc = createVector(0.06, 0.02);
    this.vel = p5.Vector.random2D();
    this.target = createVector(random(width), random(height));
    this.show = function() {
        setText("vel", ~~this.vel.x + ":" + ~~this.vel.y);
        setText("acc", ~~this.acc.x + ":" + ~~this.acc.y);
        setText("pos", ~~this.pos.x + ":" + ~~this.pos.y);

        // this.vel.limit(5);
        strokeWeight(11);
        vertex(this.pos.x, this.pos.y);
    }
    this.update = function() {
        this.vel.add(this.acc);
        this.vel.limit(5);
        this.pos.add(this.vel);
        this.acc.mult(0);
    }
    this.check_loc = function() {
        this.pos.x = (this.pos.x < 0) ? width : this.pos.x;
        this.pos.x = (this.pos.x > width) ? 0 : this.pos.x;
        this.pos.y = (this.pos.y < 0) ? height : this.pos.y;
        this.pos.y = (this.pos.y > height) ? 0 : this.pos.y;
    }
    this.attracted = function(target) {
        // let dir = target - this.pos
        let force = p5.Vector.sub(target, this.pos);
        let d = force.mag();
        d = constrain(d, 1, 25);
        let G = 40;
        let strength = G / (d * d);
        force.setMag(strength);
        if (d < 20) {
            force.mult(-10);
        }
        this.acc.add(force);
        let distance = target.dist(this.pos);
        this.color = map(distance, 0, 255, 0, 255);
    }
}