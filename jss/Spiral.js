var panel = QuickSettings.create(10, 10, "Panel");
var options = {
    a: 5,
    n: 2000,
    c: .01,
    Animate: false,
    flag: true,
    speed: .1
};

panel.addHTML("FPS", "");
panel.bindRange("n", 2000, 15000, 1200, 1, options);
panel.bindRange("speed", .05, 1.5, .1, .1, options);
panel.bindBoolean("Animate", false, options);

panel.setKey("h");

let arr = [];
let rects = [];
let t = 0;

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


    strokeWeight(.5);
    ellipseMode(CENTER);
    rectMode(CORNER);
    angleMode(DEGREES);
    colorMode(HSB, 360, 100, 100);
    noFill();
    noStroke();
    stroke("black");
    for (var x = 0; x < width; x += 50) {
        for (var y = 0; y < height; y += 50) {

            arr.push(createVector(x, y));
        }
    }
}
let a = 0;

function draw() {
    // background(0, 0, 100);
    clear();
    translate(width * .5, height * .5)
    panel.setValue("FPS", ~~getFrameRate());
    if (options.Animate) {
        options.n += (options.flag) ? options.speed : -options.speed;
        (options.n > 15000 || options.n < 1200) && (options.flag = !options.flag)
        panel.setValue("n", options.n)
    }
    beginShape();

    for (i = 0; i < 360; i++) {
        let c = map(i, 0, 360, 0, options.n)
        angle = 0.1 * c;
        x = (1 + angle) * Math.cos(angle);
        y = (1 + angle) * Math.sin(angle);
        vertex(x, y)
    }
    endShape();
}


function mouseClicked() {
    // let vec = createVector(mouseX, mouseY);

}

function getRandomColor() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function mouseDragged() {

}


function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}
