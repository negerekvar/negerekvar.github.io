// @ts-nocheck
let panel = QuickSettings.create(10, 10, "Panel");
let options = {
    map_max: 1517,
    offset: 30,
    Animate: true,
    speed: .2
};


panel.addHTML("FPS", "");
panel.bindRange("map_max", 100, 2000, 1000, 5, options);
panel.bindRange("offset", 10, 100, 30, 1, options);
panel.bindRange("speed", 0, 1, .05, .01, options);
panel.addBoolean("Animate", true, val => {
    options.Animate = val;
    (val) ? loop(): noLoop();

});

panel.setKey("h");

let positions = [];
let tgt, pt;
let diist = (x1, y1, x2, y2) => {
    return Math.sqrt(Math.pow((x1 - x2), 2) + Math.pow((y1 - y2), 2));
}

function preload() {
    font = loadFont('../fonts/AvenirNextLTPro-Demi.otf');
}

function setup() {

    const size = getContainerSize();
    x = size.w;
    y = size.h;
    let mycanvas = createCanvas(x, y);
    mycanvas.parent("myContainer"); /* id ile seçiyor classla değil */
    fill("#FF9F1C");
    colorMode(HSB);
    /*istersen gölge ekle */
    // drawingContext.shadowOffsetX = 1;
    // drawingContext.shadowOffsetY = -1;
    // drawingContext.shadowBlur = 5;
    // drawingContext.shadowColor = "black";
    rectMode(CENTER);
    for (let x = 0; x < width; x += 25) {
        for (let y = 0; y < height; y += 25) {
            positions.push({ vec: createVector(x, y), harf: getRandomString(1), color: getRandomColor() });
        }
    }
    textAlign(CENTER);
    noStroke();
    pt = createVector(random(width), random(height));
    tgt = createVector(random(width), random(height));
}

function draw() {
    panel.setValue("FPS", ~~frameRate());
    clear();
    for (let x = width - 1; x >= -options.offset; x -= options.offset) {
        for (let y = height - 1; y >= -options.offset; y -= options.offset) {
            let c = map(diist(pt.x, pt.y, x, y), 0, options.map_max, 0, 360);
            fill(c, 100, 100);
            rect(x, y, options.offset, options.offset);
        }
    }
    pt.lerp(tgt, options.speed);
    (pt.dist(tgt) < 5) && (tgt = createVector(random(width), random(height)));
    // noLoop();
}

function mousePressed() {
    tgt = createVector(mouseX, mouseY);
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

function getRandomString(n = 9) {
    const letters = '0123456789ABCÇDEFGĞHİIJKLMNOÖPRSŞTUÜVYZabcçdefgğhıijklmnoöprsştuüvyz'.split('');
    let returnString = "";
    for (let i = 0; i < n; i++) {
        returnString += letters[~~(Math.random() * letters.length)];
    }
    return returnString;
}
