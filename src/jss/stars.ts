// @ts-nocheck
// let panel = QuickSettings.create(10, 10, "🐦");
// panel.addHTML("info", "");
// panel.addButton(" Saçma isim ", function() {

//     let settings = {
//         "async": true,
//         "crossDomain": true,
//         "url": "http://localhost/isimler.json",
//         "method": "GET",
//         "headers": {
//             "as": "12",
//             "cache-control": "no-cache",
//             "postman-token": "dafee856-2cdd-43ba-bf35-967a0ccb0e6b"
//         }
//     }

//     $.ajax(settings).done(function(data) {
//         isim_id = ~~random(14115);
//         soy_isim_id = ~~random(14115);

//         panel.setValue("info", data.isimler[isim_id].isimler + " " + data.isimler[soy_isim_id].isimler + " " + data.isimler[isim_id].cinsiyet + " dir ");

//     });
// });
let cols = new Array(100);


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
    // drawingContext.shadowBlur = 5;
    // drawingContext.shadowColor = "black";
    rectMode(CENTER);
    noFill();
    for (let i = 0; i < cols.length; i++) {
        cols[i] = new rects(random(width), random(height));
    }
    stroke("#fff");
}


function draw() {
    background("#000")
    for (let i = 0; i < cols.length; i++) {
        cols[i].draw();
        // cols[i].move();
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
let rects = function(x, y) {
    this.min = random(5);
    this.max = random(5, 10);
    this.x = x;
    this.y = y;
    this.pulse = random(360);
    this.tick = random(.1);
    this.rotate = random(180)
    this.draw = function() {
        this.r = sin(this.pulse);
        this.r = map(this.r, -1, 1, 5, 10);
        push();
        translate(this.x, this.y);
        rotate(this.rotate);
        rect(0, 0, this.r, this.r);
        rect(0, 0, this.r - this.max, this.r + this.min);
        rect(0, 0, this.r + this.min, this.r - this.max);
        pop();
        this.pulse += this.tick;
    }
    this.move = function() {
        this.x += this.tick;
    }
}
