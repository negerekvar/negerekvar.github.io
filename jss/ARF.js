// A system of particles that respond to Attraction / Repulsion Forces.

var particles = [];

function setup() {

    x = $("#myContainer").width(); /* myContainerı istediğinle değiştir */
    y = $("#myContainer").height(); /* bunuda */
    var mycanvas = createCanvas(x, y);
    mycanvas.parent("myContainer"); /* id ile seçiyor classla değil */
    colorMode(HSB, width, width, width);

    /*istersen gölge ekle */
    // drawingContext.shadowOffsetX = 1;
    // drawingContext.shadowOffsetY = -1;
    // drawingContext.shadowBlur = 5;
    // drawingContext.shadowColor = "black";

    p = new particle(width / 2, height / 2);
    a = new particle(200, 200);
    for (var i = 0; i < 100; i++) {
        particles.push(new particle(random(width), random(height)));
    }

}

function draw() {
    background("#fff")
    for (var i = 0; i < particles.length; i++) {

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
        $("#vel").text(~~this.vel.x + ":" + ~~this.vel.y);
        $("#acc").text(~~this.acc.x + ":" + ~~this.acc.y);
        $("#pos").text(~~this.pos.x + ":" + ~~this.pos.y);

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
        // var dir = target - this.pos
        var force = p5.Vector.sub(target, this.pos);
        var d = force.mag();
        d = constrain(d, 1, 25);
        var G = 40;
        var strength = G / (d * d);
        force.setMag(strength);
        if (d < 20) {
            force.mult(-10);
        }
        this.acc.add(force);
        var distance = target.dist(this.pos);
        this.color = map(distance, 0, 255, 0, 255);
    }
}
