// @ts-nocheck
var arr = new Array();
let pass = false;
var panel = QuickSettings.create(10, 10, "");
var tries = 0;
var _show = true;
panel.addHTML("Count", "<p>tries</p><a href=\"#\" id=\"v1\"></a> <br><p>success</p><b  id=\"v2\"></b>")
panel.addBoolean("Show", true, function(value) {
    _show = value;
});

function setup() {
    const size = getContainerSize();
    x = size.w;
    y = size.h;
    var mycanvas = createCanvas(x, y);
    mycanvas.parent("myContainer"); /* id ile seçiyor classla değil */
    // fill("#FF9F1C");git remote update
    // 
    /*istersen gölge ekle */
    // drawingContext.shadowOffsetX = 1;
    // drawingContext.shadowOffsetY = -1;
    // drawingContext.shadowBlur = 5;
    // drawingContext.shadowColor = "black";
    // noFill();
    ellipseMode(CENTER);
    // strokeWeight(.5);
    arr.push(new Circle());
    arr.push(new Circle());
    arr.push(new Circle());
    noStroke();
}

function draw() {
    clear();
    arr.push(new Circle());
    setText("v1", tries);
    tries++;
    for (var i = 0; i < arr.length - 1; i++) {
        (arr[arr.length - 1].pos.dist(arr[i].pos) < (arr[i].r + arr[arr.length - 1].r) / 2) && (arr.pop());
    }
    if (_show) {
        for (var z = 0; z < arr.length; z++) {
            arr[z].draw();
        }
    }
    setText("v2", arr.length);
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

function Circle(x, y) {
    this.x = (x == undefined) ? random(width) : x;
    this.y = (y == undefined) ? random(height) : y;

    this.pos = (createVector(this.x, this.y));
    this.r = random(1, 60);
    this.col = getRandomColor();
}
Circle.prototype.draw = function() {
    fill(this.col);
    ellipse(this.x, this.y, this.r);
};
