// @ts-nocheck
let sets = {
    r: .01,
    α: .005,
    offset: 20,
    strokeWeight: .1
};
let a = 0;
let b = 0;
let co = 0;
let arr = new Array(10);
let panel = QuickSettings.create(10, 10, "🐦");
panel.setSize(250);
panel.addBoolean("Stop Animation", false, function (value) {
    (value === true) ? noLoop() : loop();
});
panel.hideAllTitles();
panel.setKey("h");
panel.bindRange("r", .0001, 1, .01, .001, sets);
panel.bindRange("α", .0001, 1, .005, .001, sets);
panel.bindRange("offset", 0, 100, 20, 1, sets);
panel.addHTML("Positions", "");
panel.addButton(" clear ", function () {
    clear();
});
let mycanvas;
function setup() {
    const size = getContainerSize();
    x = size.w;
    y = size.h;
    mycanvas = createCanvas(x, y);
    mycanvas.parent("myContainer"); /* id ile seçiyor classla değil */
    fill("yellow");
    /*istersen gölge ekle */
    // drawingContext.shadowOffsetX = 1;
    // drawingContext.shadowOffsetY = -1;
    // drawingContext.shadowBlur = 5;
    // drawingContext.shadowColor = "black";
    // noStroke();
    colorMode(HSB, 100);
    max_distance = dist(0, 0, width, height);
    strokeWeight(.5);
}
let yaz;
function draw() {
    // clear();
    stroke(co, 80, 80, 20);
    fill(co, 80, 80, 20);
    let x0 = map(sin(a), -1, 1, sets.offset, width - sets.offset);
    let y0 = map(cos(a), -1, 1, sets.offset, height - sets.offset);
    let x1 = map(sin(b), -1, 1, sets.offset, width - sets.offset);
    let y1 = map(cos(b), -1, 1, sets.offset, height - sets.offset);
    line(x0, y0, x1, y1);
    a += sets.r;
    b += sets.α;
    co++;
    (co > 100) && (co = 0);
    panel.setValue("Positions", ~~x0 + " " + " " + ~~y0 + " " + ~~x1 + " " + ~~y1);
}
function getRandomColor() {
    let letters = '0123456789ABCDEF'.split('');
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}
function getRandomString(len = 9) {
    const letters = '0123456789ABCÇDEFGĞHİIJKLMNOÖPRSŞTUÜVYZabcçdefgğhıijklmnoöprsştuüvyz'.split('');
    let returnString = "";
    for (let i = 0; i < len; i++) {
        returnString += letters[~~(Math.random() * letters.length)];
    }
    return returnString;
}
function windowResized() {
    // resizeCanvas(windowWidth, windowHeight);
}
