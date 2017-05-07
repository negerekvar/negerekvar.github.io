let x, y;
let kare = [];
window.speed = .001;
let scroll = 0;
let size = .5;
let img = new Array(18);
let hue = .1;

function preload() {
    for (var i = 0; i < img.length; i++) {
        img[i] = loadImage("../images/" + i + ".png");
    }

}

function setup() {

    x = $("#myContainer").width(); /* myContainerı istediğinle değiştir */
    y = $("#myContainer").height(); /* bunuda */
    var mycanvas = createCanvas(x, y);
    mycanvas.parent("myContainer"); /* id ile seçiyor classla değil */
    fill("#FF9F1C");
    /*istersen gölge ekle */
    drawingContext.shadowOffsetX = 0;
    drawingContext.shadowOffsetY = 0;
    drawingContext.shadowBlur = 7;
    drawingContext.shadowColor = "black";

    rectMode(CENTER);
    colorMode(HSB, 100);
    imageMode(CENTER);
    // noStroke();
    textAlign(CENTER, CENTER);
    for (var a = 0; a < 20; a++) {
        kare.push(new Mover(random(width), random(height)));
    };
    noFill();
}


function draw() {
    // let hr = map(sin(hue), -1, 1, 0, 360);
    // drawingContext.filter = "hue-rotate(" + hr + "deg)";
    // hue += .01;

    clear();
    strokeWeight(size);
    beginShape();
    for (var a = 0, len = kare.length; a !== len; a++) {

        kare[a].update(window.speed);
    }
    endShape(CLOSE);
    panel.setValue(" FPS ", ~~frameRate());

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


function Mover(x, y) {
    this.pos = createVector(x, y);
    this.target = createVector(random(width), random(height));
    this.img = random(img);
    this.size = ~~random(20, 60);


}
Mover.prototype.update = function(speed) {
    this.lspeed = speed || 0.001;
    this.pos.lerp(this.target, this.lspeed);
    this.dist = this.pos.dist(this.target);
    (this.dist < 15) && (this.target = createVector(random(width), random(height)));

    image(this.img, this.pos.x, this.pos.y, this.size, this.size);

};

function mouseClicked() {
    kare.push(new Mover(mouseX, mouseY));

}

function mouseWheel() {
    size += (event.deltaY < 0) ? +.03 : -.03;
    print(scroll);
}
