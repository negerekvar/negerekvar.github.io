// @ts-nocheck
let panel = QuickSettings.create(10, 10, "🐦");
panel.addText("Bir şeyler yaz", "", function (value) { output(value); });
panel.hideAllTitles();
let bbox;
// { x: 0, y: -143, h: 145.4, w: 404.6, advance: 0 }
let zarray = [];
let objarray = [];
let buffer;
function preload() {
    font = loadFont("/fonts/AvenirNextLTPro-Demi.otf");
}
function setup() {
    const size = getContainerSize();
    x = size.w;
    y = size.h;
    let mycanvas = createCanvas(x, y);
    mycanvas.parent("myContainer"); /* id ile seçiyor classla değil */
    buffer = createGraphics(x, y);
    buffer.noStroke();
    buffer.clear();
    noStroke();
}
function draw() {
    clear();
    image(buffer, 0, 0);
    let active = 0;
    for (let i = 0; i < objarray.length; i++) {
        objarray[i].go();
        active += objarray[i].active ? 1 : 0;
    }
    panel.setValue("info", "length : " + objarray.length);
    panel.setValue("fps", "fps : " + ~~frameRate() + " | active: " + active);
}
function output(_bar) {
    bbox = font.textBounds(_bar, 100, 200, 192);
    let bx = width * .5 - (bbox.w * .5);
    let by = height * .5 + (bbox.h * .5);
    zarray = font.textToPoints(_bar, bx, by, 192, {
        sampleFactor: 0.087
    });
    buffer.clear();
    objarray = new Array(zarray.length);
    for (let i = 0; i < zarray.length; i++) {
        objarray[i] = new Boom(zarray[i].x, zarray[i].y);
    }
}
function Boom(x, y) {
    this.target = createVector(x, y);
    this.pos = createVector(random(width), random(height));
    this.col = getRandomColor();
    this.active = true;
    this.go = function () {
        if (!this.active) {
            return;
        }
        this.pos.lerp(this.target, 0.12);
        this.x = this.pos.x;
        this.y = this.pos.y;
        const d = this.pos.dist(this.target);
        if (d < 0.8) {
            this.active = false;
            buffer.fill(this.col);
            buffer.ellipse(this.x, this.y, 10);
            return;
        }
        fill(this.col);
        ellipse(this.x, this.y, 10);
    };
}
function getRandomColor() {
    let letters = '0123456789ABCDEF'.split('');
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}
