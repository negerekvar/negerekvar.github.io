// @ts-nocheck
let bloomPoints = [];
function setup() {
    const size = getContainerSize();
    x = size.w;
    y = size.h;
    const mycanvas = createCanvas(x, y);
    mycanvas.parent("myContainer");
    colorMode(HSB, 360, 100, 100, 1);
    for (let i = 0; i < 80; i++) {
        bloomPoints.push({
            pos: createVector(random(width), random(height)),
            r: random(20, 120),
            hue: random(360),
            tw: random(0.005, 0.02)
        });
    }
    noStroke();
    background(0, 0, 98);
}
function draw() {
    background(0, 0, 98, 0.18);
    for (let i = 0; i < bloomPoints.length; i++) {
        const p = bloomPoints[i];
        const wobble = sin(frameCount * p.tw) * 10;
        const r = p.r + wobble;
        fill((p.hue + frameCount * 0.2) % 360, 80, 90, 0.35);
        circle(p.pos.x, p.pos.y, r);
    }
}
function windowResized() {
    const size = getContainerSize();
    resizeCanvas(size.w, size.h);
}
