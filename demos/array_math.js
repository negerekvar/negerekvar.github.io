p5.disableFriendlyErrors = true;
arr = new Array();

function setup() {
    x = $("#myContainer").width(); /* myContainerı istediğinle değiştir */
    y = $("#myContainer").height(); /* bunuda */
    var mycanvas = createCanvas(x, y);
    mycanvas.parent("myContainer"); /* id ile seçiyor classla değil */
    // fill("#FF9F1C");git remote update
    // 
    /*istersen gölge ekle */
    // drawingContext.shadowOffsetX = 1;
    // drawingContext.shadowOffsetY = -1;
    // drawingContext.shadowBlur = 5;
    // drawingContext.shadowColor = "black";
    noFill();
    ellipseMode(CENTER);
    strokeWeight(.5);
    for (var a = 0; a < 200; a++) {
        arr.push(new Yeter());
    }

}

function draw() {
    clear();
    for (var i = 0; i < arr.length - 1; i++) {
        arr[i].git();
        for (var z = i + 1; z < arr.length; z++) {
            var d = arr[i].pos.dist(arr[z].pos);;

            (d < arr[i].dst) && (line(arr[i].x, arr[i].y, arr[z].x, arr[z].y))

        }

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

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);

}

function mousePressed() {

    arr.push(new Yeter(mouseX, mouseY));
}

function Yeter(x, y) {
    this.x = (x == undefined) ? (random(width)) : x;
    this.y = (y == undefined) ? (random(width)) : y;
    this.pos = createVector(this.x, this.y);
    this.target = createVector(random(width), random(height));
    this.dst = random(100, 200);


}
Yeter.prototype.git = function() {
    this.pos.lerp(this.target, .002);
    (this.pos.dist(this.target) < 2) && (this.target = createVector(random(width), random(height)));
    this.x = this.pos.x;
    this.y = this.pos.y;
};
