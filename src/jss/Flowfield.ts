// @ts-nocheck
var panel = QuickSettings.create(10, 10, "Panel");
var options = {

    Animate: true,
};


panel.addHTML("FPS", "");
panel.addHTML("Debug", "");
panel.addBoolean("Animate", true, val => {
    options.Animate = val;
    (val) ? loop(): noLoop();

});

panel.setKey("h");

let arr = [];
let rows, cols, scl = 40,
    inc = .06,
    zoff = 0,
    flowfield = [];

function setup() {

    const size = getContainerSize();
    x = size.w;
    y = size.h;
    var mycanvas = createCanvas(x, y);
    mycanvas.parent("myContainer"); /* id ile seçiyor classla değil */
    fill("#FF9F1C");
    /*istersen gölge ekle */
    // drawingContext.shadowOffsetX = 1;
    // drawingContext.shadowOffsetY = -1;
    // drawingContext.shadowBlur = 5;
    // drawingContext.shadowColor = "black";
    angleMode(DEGREES);
    rectMode(CENTER);
    cols = floor(width / scl);
    rows = floor(height / scl);
    // stroke("#000");
    // strokeWeight(5)
    noFill();
    // strokeWeight(1);
    colorMode(HSB);

    for (var a = 0; a < 100; a++) {
        arr.push(new Particle(random(width), random(height)));
    }

}

function draw() {
    panel.setValue("FPS", ~~getFrameRate());
    clear();
    let yoff = 0;
    for (var y = 0; y < rows + 1; y++) {
        let xoff = 0;
        for (var x = 0; x < cols + 1; x++) {
            let index = (x + y * (cols + 1));
            let r = noise(xoff, yoff, zoff, frameCount) * 360 * 4;
            xoff += inc;
            let v = p5.Vector.fromAngle(radians(r));
            v.setMag(15);
            flowfield[index] = v;

            // fill(r);
            // stroke(r, 100, 100)
            push();
            translate(x * scl, y * scl);
            line(0, 0, v.x, v.y);

            pop();



        }
        yoff += inc;
        zoff += .0005
    }
    for (var i = 0; i < arr.length; i++) {
        let bu = arr[i];
        bu.follow(flowfield);
        bu.edgecheck();
        bu.update();
        bu.show();
    }
}




function windowResized() {
    resizeCanvas(windowWidth, windowHeight);

}

function Particle(x, y) {
    this.pos = createVector(x, y);
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);

    this.update = function() {
        this.pos.add(this.vel);
        this.vel.add(this.acc);
        this.vel.limit(5);
    }
    this.forceadd = function(F) {
        this.acc = F;
    }
    this.edgecheck = function() {
        (this.pos.x > width) && (this.pos.x = 0);
        (this.pos.x < 0) && (this.pos.x = width);
        (this.pos.y > height) && (this.pos.y = 0);
        (this.pos.y < 0) && (this.pos.y = height);
    }
    this.show = function() {
        push();
        strokeWeight(7);
        point(this.pos.x, this.pos.y)

        pop();


    }
    this.follow = function(vectors) {
        let x = floor(this.pos.x / scl);
        let y = floor(this.pos.y / scl);
        let index = x + y * cols;
        let F = vectors[index];
        this.forceadd(F);
    }
}
