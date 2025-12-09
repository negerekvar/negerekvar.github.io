// @ts-nocheck
var panel = QuickSettings.create(10, 10, "🎯");
let x1 = Math.random() * innerWidth,
    x2 = Math.random() * innerWidth,
    y1 = Math.random() * innerHeight,
    y2 = Math.random() * innerHeight;
panel.addRange("X1", 0, innerWidth, x1, 1, (val) => {
    x1 = val
})
panel.addRange("X2", 0, innerWidth, x1, 1, (val) => {
    x2 = val
})
panel.addRange("Y1", 0, innerHeight, y1, 1, (val) => {
    y1 = val
})
panel.addRange("Y2", 0, innerHeight, y2, 1, (val) => {
    y2 = val
})
panel.addHTML("HitPoint", "");
var cols = new Array(100),
    Fx1 = 0,
    Fx2 = 0,
    Fy1 = 0,
    Fy2 = 0;

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


    rectMode(CENTER);
    noFill();
    stroke("#FF9F1C");
    strokeWeight(1.5);
    Fx1 = random();
    Fx2 = random();
    Fy1 = random();
    Fy2 = random();
}


function draw() {
    background("#000");
    // clear();
    line(x1, 0, x2, height);
    line(0, y1, width, y2);
    hit = collideLineLine(x1, 0, x2, height, 0, y1, width, y2, true);
    push();
    fill("#000")
    ellipse(hit.x, hit.y, 34);
    panel.setValue("HitPoint", ~~hit.x + " : " + ~~hit.y);
    pop();
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

function ddd() {
    var top = sin(Fx1),
        bottom = sin(Fx2),
        right = cos(Fy1),
        left = cos(Fy2),
        LineTop = map(top, -1, 1, 0, width),
        LineBottom = map(bottom, -1, 1, 0, width),
        LineRight = map(right, -1, 1, 0, height),
        LineLeft = map(left, -1, 1, 0, height),
        r = map(top, -1, 1, 0, 255),
        g = map(bottom, -1, 1, 0, 255),
        b = map(right, -1, 1, 0, 255);
    stroke(r, g, b);
    Fx1 += .001;
    Fx2 += .003;
    Fy1 += .009;
    Fy2 += .001;
    // line(LineTop, 0, LineBottom, height);
    // line(0, LineRight, width, LineLeft);
    hit = collideLineLine(LineTop, 0, LineBottom, height, 0, LineRight, width, LineLeft, true);
    point(hit.x, hit.y);
}
