// @ts-nocheck
let arr = [];
let arm1, arm2;
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
    strokeWeight(.5);
    arm1 = new Segment(width * .5, height * .5, random(75, 200), 90);
    arm2 = new Segment(arm1.endP.x, arm1.endP.y, random(75, 200), 30);
    arm3 = new Segment(arm2.endP.x, arm2.endP.y, random(75, 200), 45);
    arm4 = new Segment(arm3.endP.x, arm3.endP.y, random(75, 200), 120);
    noFill();
    // colorMode(HSB);
    angleMode(DEGREES);
}
let xoff = 0;
function draw() {
    panel.setValue("FPS", ~~getFrameRate());
    panel.setValue("Length", arr.length);
    clear();
    arm1.ang = map(noise(xoff), 0, 1, 0, 360);
    arm2.ang = map(noise(xoff * 2), 0, 1, 0, 360);
    arm3.ang = map(noise(xoff * .5), 0, 1, 0, 360);
    arm4.ang = map(noise(xoff * .91), 0, 1, 0, 360);
    arm1.show();
    arm2.pos = arm1.pos;
    arm2.show();
    arm3.pos = arm2.pos;
    arm3.show();
    arm4.pos = arm3.pos;
    arm4.show();
    xoff += .01;
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
function Segment(x, y, len, angle) {
    this.startP = createVector(x, y);
    this.endP = createVector();
    this.len = len;
    this.angle = angle;
    this.arr = new Array(4);
}
Segment.prototype.show = function () {
    this.endP.x = (cos(this.angle) * this.len) + this.startP.x;
    this.endP.y = (sin(this.angle) * this.len) + this.startP.y;
    line(this.startP.x, this.startP.y, this.endP.x, this.endP.y);
};
Object.defineProperty(Segment.prototype, "ang", {
    set: function (_angle) {
        this.angle = _angle;
    }
});
Object.defineProperty(Segment.prototype, "pos", {
    set: function (_pos) {
        this.startP = _pos;
    },
    get: function () {
        return this.endP;
    }
});
