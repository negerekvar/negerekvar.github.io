// @ts-nocheck
let bird = [];

function setup() {
    const size = getContainerSize();
    x = size.w;
    y = size.h;
    var mycanvas = createCanvas(x, y);
    mycanvas.parent("myContainer"); /* id ile seçiyor classla değil */
    for (var i = 0; i < 55; i++) {
        bird.push(new Birds());
    }
    rectMode(CENTER);
    strokeWeight(.5);
    stroke("#631A86");
    frameRate(30);
}

function draw() {
    background("#000");
    for (var i = 0; i < bird.length; i++) {
        bird[i].fly();
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

function middlePoint(v1, v2) {
    return createVector((v1.x + v2.x) / 2, ((v1.y + v2.y) / 2));
}
class Birds {
    constructor() {
        this.pos = createVector(random(width), random(height));
        this.target = createVector(random(width), random(height));
        this.color = Birds.rndColor();
        this.polyCount = random(3, 10);
        this.arr = [];
        for (var i = 0; i < this.polyCount; i++) {
            this.arr.push({
                pos: createVector(this.pos.x + random(50), this.pos.y + random(50)),
                target: createVector(this.pos.x + random(150), this.pos.y + random(150)),
                id: i,
                amount: 0.02

            });
        }

    }

    fly() {
        stroke(this.color);
        for (var i = 0; i < this.arr.length; i++) {
            let bu = this.arr[i];
            for (var z = i; z < this.arr.length; z++) {
                let o = this.arr[z];
                if (bu.id == o.id) continue
                line(bu.pos.x, bu.pos.y, o.pos.x, o.pos.y);
            }
            bu.pos.lerp(bu.target, bu.amount);
            bu.pos.dist(bu.target) < 15 && (bu.target = createVector(this.pos.x + random(150), this.pos.y + random(150)))
        }
        this.pos.lerp(this.target, 0.007)
        this.pos.dist(this.target) < 15 && (this.target = createVector(random(width), random(height)))
    }
    static rndColor() {
        let cstr = "0123456789ABCDEF".split("");
        let rstr = "";
        for (var i = 0; i < 6; i++) {
            rstr += cstr[~~(Math.random() * 16)];
        }
        return "#" + rstr;
    }
}