// @ts-nocheck
let flowParticles: any[] = [];
let zOff = 0;

function setup() {
    const size = getContainerSize();
    x = size.w;
    y = size.h;
    const mycanvas = createCanvas(x, y);
    mycanvas.parent("myContainer");
    colorMode(HSB, 360, 100, 100, 1);
    for (let i = 0; i < 600; i++) {
        flowParticles.push({
            pos: createVector(random(width), random(height)),
            hue: random(140, 180),
            speed: random(0.5, 2.2)
        });
    }
    strokeWeight(1.1);
    background(180, 10, 12);
}

function draw() {
    background(180, 10, 12, 0.12);
    for (let i = 0; i < flowParticles.length; i++) {
        const p = flowParticles[i];
        const angle = noise(p.pos.x * 0.003, p.pos.y * 0.003, zOff) * TWO_PI * 2;
        const v = p5.Vector.fromAngle(angle).mult(p.speed);
        p.pos.add(v);
        if (p.pos.x < 0) p.pos.x = width;
        if (p.pos.x > width) p.pos.x = 0;
        if (p.pos.y < 0) p.pos.y = height;
        if (p.pos.y > height) p.pos.y = 0;
        stroke(p.hue, 70, 90, 0.6);
        point(p.pos.x, p.pos.y);
    }
    zOff += 0.0025;
}

function windowResized() {
    const size = getContainerSize();
    resizeCanvas(size.w, size.h);
}
