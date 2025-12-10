// @ts-nocheck
let arr = [];
let points
let font;

function preload() {
    font = loadFont('fonts/AvenirNextLTPro-Demi.otf');
}

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
    drawingContext.shadowBlur = 5;
    drawingContext.shadowColor = "black";
    // drawingContext.globalAlpha = 0.5;
    // drawingContext.globalCompositeOperation = "lighter";
    noStroke();
    points = Calculate_Place("Naber");
    for (let a = 0; a < points.length; a++) {
        arr.push(new Mover(a));
    }
}



function draw() {

    clear();
    // translate(width * 0.5, height * 0.5)
    // rect(center.x - (bbox.w / 2), center.y - (bbox.h / 2), bbox.w, bbox.h);
    // ellipse(width * 0.5, height * 0.5, 60, 60)
    for (let i in arr) {
        arr[i].calc();
    }
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

function Mover(id) {
    this.pos = createVector(random(width), random(height));
    this.target = createVector(random(width), random(height));
    this.r = random(10, 15);
    this.speed = random(0.05, 0.09);
    this.flag = false;
    this.id = id
    this.color = getRandomColor();
}
Mover.prototype.calc = function() {
    fill(this.color);
    ellipse(this.pos.x, this.pos.y, this.r, this.r);
    this.pos.lerp(this.target, this.speed);
    this.target = this.pos.catch(this.target, 3) ? createVector(random(width), random(height)) : this.target;
    if (this.flag) {
        this.target = createVector(points[this.id].x, points[this.id].y)
            // this.flag = !this.flag
    }
};
p5.Vector.prototype.catch = function(that, distance) {
    return (this.dist(that) < distance) ? true : false;
};
p5.Vector.prototype.checkloc = function() {
    this.x = (this.x > width) ? 0 : this.x;
    this.x = (this.x < 0) ? width : this.x;
    this.y = (this.y > height) ? 0 : this.y;
    this.y = (this.y < 0) ? height : this.y;
};

function keyPressed() {
    if (keyCode === 13) {
        for (let i in arr) {
            arr[i].flag = !arr[i].flag
        }
    }
}

function Calculate_Place(_text, x, y, fontsize, sample_Factor) {
    this.center = {
        x: width / 2,
        y: height / 2
    };
    (typeof(_text) === 'string') ? console.log("oki"): console.error("String gir");
    this.point_array = [];

    this.x = (!x) ? center.x : x;
    this.y = (!y) ? center.y : y;
    this._text = _text;
    this._size = (!fontsize) ? 192 : fontsize;
    this.sr = (!sample_Factor) ? 0.1 : sample_Factor;
    this.ref = font.textBounds(this._text, 0, 0, this._size);
    this.point_array = font.textToPoints(this._text, this.x -
        (this.ref.w / 2), this.y + (this.ref.h / 2), this._size, {
            sampleFactor: this.sr
        });
    console.log("Array length =", this.point_array.length)
    return this.point_array;
}
Object.defineProperty(Array.prototype, 'random', {
    value: function() {
        return this[~~random(this.length)]
    }
});
