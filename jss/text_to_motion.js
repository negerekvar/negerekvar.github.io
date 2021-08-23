var panel = QuickSettings.create(10, 10, "🐦");
panel.addText("Bir şeyler yaz", "", function (value) { output(value) });
panel.addHTML("info", "Turn it off and back on again");
panel.addHTML("fps", "");
panel.hideAllTitles();
panel.setKey("h");
var particles = [];
var bbox;
// { x: 0, y: -143, h: 145.4, w: 404.6, advance: 0 }
var zarray = [];
var objarray = [];

function preload() {
    font = loadFont("/fonts/AvenirNextLTPro-Demi.otf");
}
function setup() {

    x = $("#myContainer").width(); /* myContainerı istediğinle değiştir */
    y = $("#myContainer").height(); /* bunuda */
    var mycanvas = createCanvas(x, y);
    mycanvas.parent("myContainer"); /* id ile seçiyor classla değil */
    // noFill();

    noStroke();

    /*istersen gölge ekle */
    drawingContext.shadowOffsetX = 1;
    drawingContext.shadowOffsetY = -1;
    drawingContext.shadowBlur = 5;
    drawingContext.shadowColor = "black";

}

function draw() {
    background("#000");
    clear();

    for (var i = 0; i < particles.length; i++) {
        ellipse(particles[i].x, particles[i].y, 30);
    }
    for (var i = 0; i < objarray.length; i++) {
        objarray[i].go();

    }
    panel.setValue("info", "length : " + objarray.length);
    panel.setValue("fps", "fps : " + ~~frameRate());
}


function output(_bar) {
    bbox = font.textBounds(_bar, 100, 200, 192);
    var bx = width * .5 - (bbox.w * .5);
    var by = height * .5 + (bbox.h * .5);


    zarray = font.textToPoints(_bar, bx, by, 192, {
        sampleFactor: 0.087
    });
    objarray = new Array(zarray.length);
    for (var i = 0; i < zarray.length; i++) {
        objarray[i] = new Boom(zarray[i].x, zarray[i].y);
    }

}

function Boom(x, y) {
    this.target = createVector(x, y);
    this.pos = createVector(random(width), random(height));
    this.col = getRandomColor();
    this.go = function () {
        this.pos.lerp(this.target, 0.07);
        this.x = this.pos.x;
        this.y = this.pos.y;
        fill(this.col)
        ellipse(this.x, this.y, 10);
    }
}

function getRandomColor() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}
