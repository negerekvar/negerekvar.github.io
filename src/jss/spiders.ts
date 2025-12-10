// @ts-nocheck
//  ▄▄▄▄    █    ██     ███▄    █ ▓█████     ██▓    ▄▄▄       ███▄    █    
// ▓█████▄  ██  ▓██▒    ██ ▀█   █ ▓█   ▀    ▓██▒   ▒████▄     ██ ▀█   █    
// ▒██▒ ▄██▓██  ▒██░   ▓██  ▀█ ██▒▒███      ▒██░   ▒██  ▀█▄  ▓██  ▀█ ██▒   
// ▒██░█▀  ▓▓█  ░██░   ▓██▒  ▐▌██▒▒▓█  ▄    ▒██░   ░██▄▄▄▄██ ▓██▒  ▐▌██▒   
// ░▓█  ▀█▓▒▒█████▓    ▒██░   ▓██░░▒████▒   ░██████▒▓█   ▓██▒▒██░   ▓██░   
// ░▒▓███▀▒░▒▓▒ ▒ ▒    ░ ▒░   ▒ ▒ ░░ ▒░ ░   ░ ▒░▓  ░▒▒   ▓▒█░░ ▒░   ▒ ▒    
// ▒░▒   ░ ░░▒░ ░ ░    ░ ░░   ░ ▒░ ░ ░  ░   ░ ░ ▒  ░ ▒   ▒▒ ░░ ░░   ░ ▒░   
//  ░    ░  ░░░ ░ ░       ░   ░ ░    ░        ░ ░    ░   ▒      ░   ░ ░    
//  ░         ░                 ░    ░  ░       ░  ░     ░  ░         ░    
//       ░



let arr = [];
let mycanvas;

function setup() {

    const size = getContainerSize();
    x = size.w;
    y = size.h;
    mycanvas = createCanvas(x, y);
    mycanvas.parent("myContainer"); /* id ile seçiyor classla değil */
    fill("white");
    imageMode(CENTER);
    rectMode(CENTER);
    /*istersen gölge ekle */
    // drawingContext.shadowOffsetX = 1;
    // drawingContext.shadowOffsetY = -1;
    // drawingContext.shadowBlur = 5;
    // drawingContext.shadowColor = "black";
    for (let i = 0; i < 150; i++) {
        arr.push(new DD());
        //pix.push(new SS(random(width), height / 2));
    }

    arr_length = arr.length;
    strokeWeight(0.5)
    stroke("fff");

}

function draw() {

    background("#268BD2");

    for (let i = 0; i < arr.length; i++) {

        //pix[i].move();
        for (let z = 0; z < arr.length; z++) {
            if (i != z && arr[i].intersect(arr[z])) {

                line(arr[i].pos.x, arr[i].pos.y, arr[z].pos.x, arr[z].pos.y);
            }
        }
        arr[i].draw();
        arr[i].there();

    }
    setText("fps", ~~getFrameRate());
    setText("adet", arr.length);

}


// function getRandomColor() {
//     let letters = '0123456789ABCDEF'.split('');
//     let color = '#';
//     for (let i = 0; i < 6; i++) {
//         color += letters[Math.floor(Math.random() * 16)];
//     }
//     return color;
// }

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);

}

function DD(x, y) {
    this.x = (x !== undefined) ? x : ~~random(width);
    this.y = (y !== undefined) ? y : ~~random(height);
    this.target = createVector(~~random(width), ~~random(height));
    this.pos = createVector(this.x, this.y);
    this.amount = random() / 99;
    this.r = random(5, 15);
    this.color = "#fff";

}
DD.prototype.draw = function() {
    fill(this.color);
    push();
    noStroke();
    ellipse(this.pos.x, this.pos.y, this.r, this.r);
    pop();
    this.pos.lerp(this.target, this.amount);

};
DD.prototype.there = function() {
    this.distance = this.pos.dist(this.target);
    (this.distance < 5) ? this.target = createVector(~~random(width), ~~random(height)): this.target = this.target;
};
DD.prototype.intersect = function(other) {

    this.collision = this.pos.dist(other.pos);
    if (this.collision < (this.r + other.r) + 30) {
        return true
    } else {
        return false
    }
};


function mousePressed() {
    arr.push(new DD(mouseX, mouseY));
    console.log(mouseX + ":" + mouseY)
}

function getRandomColor() {
    let letters = '0123456789ABCDEF'.split('');
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}
