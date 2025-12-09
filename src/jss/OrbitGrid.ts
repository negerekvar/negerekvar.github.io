// @ts-nocheck
let orbiters: any[] = [];

function setup() {
    const size = getContainerSize();
    x = size.w;
    y = size.h;
    const mycanvas = createCanvas(x, y);
    mycanvas.parent("myContainer");
    angleMode(DEGREES);
    colorMode(HSB, 360, 100, 100);
    noFill();
    for (let i = 0; i < 36; i++) {
        orbiters.push({
            radius: map(i, 0, 36, 40, min(width, height) * 0.45),
            speed: random(0.5, 2),
            hue: random(360)
        });
    }
    background(220, 20, 8);
}

function draw() {
    background(220, 20, 8, 0.08);
    translate(width * 0.5, height * 0.5);
    strokeWeight(1.2);
    for (let i = 0; i < orbiters.length; i++) {
        const o = orbiters[i];
        const ang = frameCount * o.speed;
        const x1 = cos(ang) * o.radius;
        const y1 = sin(ang) * o.radius;
        const x2 = cos(ang + 90) * (o.radius * 0.6);
        const y2 = sin(ang + 90) * (o.radius * 0.6);
        stroke(o.hue, 80, 90, 0.8);
        line(x1, y1, x2, y2);
        stroke(o.hue, 40, 95, 0.3);
        circle(0, 0, o.radius * 2);
    }
}

function windowResized() {
    const size = getContainerSize();
    resizeCanvas(size.w, size.h);
}
