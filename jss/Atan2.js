let panel = QuickSettings.create(10, 10, "Panel");
let x = innerWidth;
let y = innerHeight;
let params = {
    X: x * .5,
    Y: y * .5,
    _size: 40
}
panel.bindRange("X", 0, x, params.X, 1, params);
panel.bindRange("Y", 0, y, params.Y, 1, params);
panel.bindRange("_size", 20, 100, params._size, 1, params);
panel.addBoolean("Animate", true, (val) => {
    (val) ? (loop()) : (noLoop());
});
panel.setKey("h");

function setup() {

    x = $("#myContainer").width(); /* myContainerı istediğinle değiştir */
    y = $("#myContainer").height(); /* bunuda */
    let mycanvas = createCanvas(x, y);
    mycanvas.parent("myContainer"); /* id ile seçiyor classla değil */
    // fill("#FF9F1C");
    /*istersen gölge ekle */
    // drawingContext.shadowOffsetX = 1;
    // drawingContext.shadowOffsetY = -1;
    // drawingContext.shadowBlur = 5;
    // drawingContext.shadowColor = "black";
    strokeWeight(12.5)
        // ellipseMode(CENTER);
        // rectMode(CENTER);
        // noFill();
        // angleMode(DEGREES);
    colorMode(HSB, 100);

}

let arr = [];
let t = 0;

function draw() {
    clear();

    for (var a = -params._size; a < width + params._size; a += params._size) {
        for (var z = -params._size; z < height + params._size; z += params._size) {
            push();
            translate(a, z);
            let dx = mouseX - a;
            let dy = mouseY - z;
            let v1 = createVector(mouseX, mouseY);
            let v2 = createVector(a, z);
            let d = p5.Vector.dist(v1, v2);
            let c = map(d, 0, 900, 0, 100);
            stroke(c, 100, 100);
            let angle = atan2(dy, dx);
            rotate(angle);
            beginShape();
            vertex(0 - 15, 0);
            vertex(0 + 15, 0);

            endShape();
            pop();
        }
    }
};

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